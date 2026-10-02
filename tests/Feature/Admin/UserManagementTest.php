<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('guests cannot access user management', function () {
    $response = $this->get(route('admin.users.index'));

    $response->assertRedirect(route('login'));
});

test('authenticated users can create, update, and delete users', function () {
    $admin = User::factory()->create();

    $createResponse = $this
        ->actingAs($admin)
        ->post(route('admin.users.store'), [
            'name' => 'Operator Baru',
            'email' => 'operator@example.com',
            'password' => 'password baru 123',
            'password_confirmation' => 'password baru 123',
        ]);

    $createResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.users.index'));

    $createdUser = User::where('email', 'operator@example.com')->firstOrFail();
    expect(Hash::check('password baru 123', $createdUser->password))->toBeTrue();

    $updateResponse = $this
        ->actingAs($admin)
        ->put(route('admin.users.update', $createdUser), [
            'name' => 'Operator Diperbarui',
            'email' => 'operator.updated@example.com',
            'password' => '',
            'password_confirmation' => '',
        ]);

    $updateResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.users.index'));

    expect($createdUser->refresh()->name)->toBe('Operator Diperbarui');
    expect($createdUser->email)->toBe('operator.updated@example.com');
    expect(Hash::check('password baru 123', $createdUser->password))->toBeTrue();

    $deleteResponse = $this
        ->actingAs($admin)
        ->delete(route('admin.users.destroy', $createdUser));

    $deleteResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.users.index'));

    expect($createdUser->fresh())->toBeNull();
});

test('the currently authenticated user cannot be deleted from user management', function () {
    $admin = User::factory()->create();

    $response = $this
        ->actingAs($admin)
        ->delete(route('admin.users.destroy', $admin));

    $response->assertSessionHasErrors('user');
    expect($admin->fresh())->not->toBeNull();
});
