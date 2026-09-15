<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Mail\NewMessageNotification;
use App\Mail\MessageReplyNotification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Message::with('repliedByUser')
            ->orderBy('created_at', 'desc');

        // Filter by status
        if ($request->has('status')) {
            match ($request->status) {
                'unread' => $query->unread(),
                'read' => $query->read(),
                'replied' => $query->whereNotNull('adminReply'),
                default => null
            };
        }

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $messages = $query->paginate(15)->withQueryString();

        // Statistics
        $stats = [
            'total' => Message::count(),
            'unread' => Message::unread()->count(),
            'read' => Message::read()->count(),
            'replied' => Message::whereNotNull('adminReply')->count(),
        ];

        return Inertia::render('admin/message/index', [
            'messages' => $messages,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function show(Message $message): Response
    {
        $message->load('repliedByUser');
        $message->markAsRead();

        return Inertia::render('admin/message/show', [
            'message' => $message,
        ]);
    }

    public function reply(Request $request, Message $message)
    {
        Log::info('function reply called');
        Log::info('Admin replying to message', $request->all());
        $request->validate([
            'reply' => 'required|string|min:10',
        ]);

        try {
            $message->update([
                'adminReply' => $request->reply,
                'repliedAt' => now(),
                'repliedByUserId' => auth()->id(),
                'isRead' => true,
                'readAt' => $message->readAt ?? now(),
            ]);

            // Kirim email balasan ke pengirim
            Mail::to($message->email)->send(
                new MessageReplyNotification($message, $request->reply)
            );

            Log::info('Message reply email sent', [
                'message_id' => $message->id,
                'to' => $message->email,
            ]);

            return redirect()
                ->route('admin.message.show', $message)
                ->with('success', 'Balasan berhasil dikirim');
        } catch (\Exception $e) {
            Log::error('Failed to send message reply email', [
                'message_id' => $message->id ?? null,
                'to' => $message->email ?? null,
                'error' => $e->getMessage(),
            ]);
            return back()->with('error', 'Gagal mengirim balasan: ' . $e->getMessage());
        }
    }

    public function markAsRead(Message $message)
    {
        $message->markAsRead();
        return back()->with('success', 'Pesan ditandai sebagai sudah dibaca');
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return back()->with('success', 'Pesan berhasil dihapus');
    }
}
