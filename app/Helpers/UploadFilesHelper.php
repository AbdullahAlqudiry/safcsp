<?php 
namespace App\Helpers;
use Illuminate\Support\Str;

class UploadFilesHelper {


    public static function uploadFiles($documents = [], $directory = 'app') {

        if(!is_array($documents)) {
            $documents = [$documents];
        }


        $documentsData = [];
        foreach($documents as $document) {

            $documentName = Str::random(40) . '.' . $document->getClientOriginalExtension();
            $document->storeAs($directory, $documentName);

            $documentsData[] = [
                'document_path' => $documentName,
                'document_name' => $document->getClientOriginalName()
            ];
        }


        return $documentsData;
    }

}

?>