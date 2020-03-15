<?php

namespace App\Http\Controllers\Traits;

trait Authorizable
{
    private $abilities = [
        'index' => 'view',
        'edit' => 'edit',
        'show' => 'view',
        'update' => 'edit',
        'create' => 'add',
        'store' => 'add',
        'destroy' => 'delete',
        'groups' => 'add',
        'roles' => 'add',
        'removeGroup' => 'view',
        'removeUser' => 'view',
    ];

    private $exceptionRoutes = [
    ];

    private $exceptionControllers = [
    ];

    /**
     * Override of callAction to perform the authorization before
     *
     * @param $method
     * @param $parameters
     * @return mixed
     */
    public function callAction($method, $parameters)
    {
        $inExceptionControllers = in_array(get_class($this), $this->exceptionControllers);
        $inExceptionRoutes = in_array($this->getRouteName(), $this->exceptionRoutes);

        if (!$inExceptionRoutes && !$inExceptionControllers) {
            $this->authorize($this->getAbility($method));
        }

        return parent::callAction($method, $parameters);
    }

    public function getAbility($method)
    {
        $routeName = explode('.', $this->getRouteName());
        $action = $this->getAbilities()[$method];

        if (count($routeName) == 3) {
            return $action ? $routeName[0] . '_' . $action . '_' . $routeName[1] : null;
        } else if (count($routeName) == 4) {
            return $action ? $routeName[0] . '_' . $action . '_' . $routeName[1]. '_' . $routeName[2] : null;
        } else if (count($routeName) == 5) {
            return $action ? $routeName[0] . '_' . $action . '_' . $routeName[1]. '_' . $routeName[2]. '_' . $routeName[3] : null;
        } else if (count($routeName) == 2) {
            return $action ? $action . '_' . $routeName[0] : $routeName[0].'_' .$routeName[1];
        } else if (count($routeName) == 1) {
            return $routeName[0];
        }
    }

    private function getAbilities()
    {
        return $this->abilities;
    }

    public function setAbilities($abilities)
    {
        $this->abilities = $abilities;
    }

    public function getRouteName()
    {
        return \Request::route()->getName();
    }
}
