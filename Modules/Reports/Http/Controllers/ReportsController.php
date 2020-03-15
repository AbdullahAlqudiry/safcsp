<?php

namespace Modules\Reports\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Authorizable;
use App\Helpers\UploadFilesHelper;
use Modules\Reports\Http\Requests\CreateNewReportRequest;
use Modules\Reports\Http\Requests\UpdateReportRequest;
use Modules\Core\Entities\Group;
use Modules\Reports\Entities\Report;


class ReportsController extends Controller
{

    use Authorizable;
    
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {
        $reportsData = Report::availableReports(auth()->user())->search($request->search)->withCount('groups', 'documents')->with('user')->paginate(20);
        return response()->json($reportsData);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(CreateNewReportRequest $request)
    {
        $reportData     = Report::createNewReport($request);

        $documentsData  = UploadFilesHelper::uploadFiles($request->documents, 'documents');
        foreach($documentsData as $document) {
            $reportData->documents()->create($document);
        }
        
        return response()->json('success');
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $reportData = auth()->user()->reports()->availableReports(auth()->user())->with('groups', 'documents')->with('user')->findOrFail($id);
        return response()->json($reportData);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(UpdateReportRequest $request, $id)
    {
        $reportData = auth()->user()->reports()->findOrFail($id);
        $reportData->update($request->only('title', 'content', 'tags'));
        $reportData->groups()->sync($request->group_ids);

        return response()->json('success');

    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $reportData = auth()->user()->reports()->findOrFail($id);
        $reportData->groups()->sync([]);
        $reportData->documents()->delete();
        $reportData->delete();
        return response()->json('success');
    }

    /**
     * Get groups data
     */
    public function groups(Request $request)
    {
        $groupsData = Group::availableGroups(auth()->user());
        return response()->json($groupsData);    
    }
}
