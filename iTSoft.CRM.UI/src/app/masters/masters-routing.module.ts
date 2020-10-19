import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "designation",
        loadChildren: () =>
            import('./designation/designation.module').then(m => m.DesignationModule)
    },
    {
        path: "service",
        loadChildren: () =>
            import('./service/service.module').then(m => m.ServiceModule)
    },
    {
        path: "source",
        loadChildren: () =>
            import('./source/source.module').then(m => m.SourceModule)
    },
    {
        path: "stage",
        loadChildren: () =>
            import('./stage/stage.module').then(m => m.StageModule)
    },
    {
        path: "state",
        loadChildren: () =>
            import('./state/state.module').then(m =>m.StateModule)
    },
    {
        path: "status",
        loadChildren: () =>
            import('./status/status.module').then(m => m.StatusModule)
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class MasterRoutingModule { }