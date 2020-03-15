<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Modules\Reports\Entities\Document;

class DocumentsController extends Controller
{

    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show($id, $documentPath)
    {
        $documentData = Document::where([ ['report_id', $id], ['document_path', $documentPath]])->first();
        if(is_null($documentData)) {
            abort(404);
        }
        return response()->download(storage_path('app/documents/') . $documentData->document_path, $documentData->document_name);
    }

}
