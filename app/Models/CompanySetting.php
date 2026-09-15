<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class CompanySetting extends Model
{
    protected $fillable = [
        'company_name',
        'company_address',
        'company_phone',
        'company_email',
        'company_website',
        'company_description',
        'logo_path',
        'favicon_path',
        'social_media',
        'google_maps_embed',
        'whatsapp_number',
        'whatsapp_default_message',
        'whatsapp_enabled',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'tagline',
        'short_description_below_tagline',
        'founding_year',
    ];

    protected $casts = [
        'social_media' => 'array',
        'whatsapp_enabled' => 'boolean',
    ];

    public static function getSettings()
    {
        $settings = self::first();
        if (!$settings) {
            return [
                'company_name' => '',
                'company_address' => '',
                'company_phone' => '',
                'company_email' => '',
                'company_website' => '',
                'company_description' => '',
                'logo_path' => null,
                'favicon_path' => null,
                'social_media' => [
                    'facebook' => '',
                    'instagram' => '',
                    'twitter' => '',
                    'linkedin' => '',
                    'youtube' => ''
                ],
                'google_maps_embed' => '',
                'whatsapp_number' => '',
                'whatsapp_default_message' => '',
                'whatsapp_enabled' => false,
                'meta_title' => '',
                'meta_description' => '',
                'meta_keywords' => '',
            ];
        }
        return $settings->toArray();
    }

    public static function updateSettings(array $data)
    {
        foreach ($data as $key => $value) {
            self::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value,
                    'type' => self::getTypeForKey($key),
                    'group' => self::getGroupForKey($key)
                ]
            );
        }
    }

    public static function updateSetting(string $key, $value)
    {
        self::updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'type' => self::getTypeForKey($key),
                'group' => self::getGroupForKey($key)
            ]
        );
    }

    private static function getTypeForKey(string $key): string
    {
        $types = [
            'whatsapp_enabled' => 'boolean',
            'social_media' => 'json',
            'logo_path' => 'file',
            'favicon_path' => 'file',
        ];

        return $types[$key] ?? 'string';
    }

    private static function getGroupForKey(string $key): string
    {
        $groups = [
            'company_name' => 'company',
            'company_address' => 'company',
            'company_phone' => 'company',
            'company_email' => 'company',
            'company_website' => 'company',
            'company_description' => 'company',
            'logo_path' => 'media',
            'favicon_path' => 'media',
            'social_media' => 'social',
            'google_maps_embed' => 'maps',
            'whatsapp_number' => 'whatsapp',
            'whatsapp_default_message' => 'whatsapp',
            'whatsapp_enabled' => 'whatsapp',
            'meta_title' => 'seo',
            'meta_description' => 'seo',
            'meta_keywords' => 'seo',
        ];

        return $groups[$key] ?? 'general';
    }
}
