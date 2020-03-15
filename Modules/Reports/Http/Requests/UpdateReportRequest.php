<?php

namespace Modules\Reports\Http\Requests;

use Illuminate\Http\Request;
use Illuminate\Foundation\Http\FormRequest;

class UpdateReportRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    {
        return [
            'title' => ['required', 'string', 'max:50'],
            'content' => ['required', 'string'],
            'tags' => ['required', 'string', 'max:255'],
            'group_ids' => ['required', 'array'],
            'group_ids.*' => ['exists:group_user,group_id,user_id,' . $request->user()->id],
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}
