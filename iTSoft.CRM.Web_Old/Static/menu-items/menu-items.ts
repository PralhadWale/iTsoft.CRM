import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'employer/add-employee', name: 'Add Employee', type: 'link', icon: 'add_circle_outline' },
  { state: 'employer/release', name: 'Release', type: 'link', icon: 'new_releases' },
  { state: 'employer/it-declaration', name: 'IT Declarations', type: 'link', icon: 'content_copy' },
  { state: 'employer/CRM-Tracking', name: 'CRM Tracking', type: 'link', icon: 'trending_up' },
  { state: 'employer/logout', name: 'Log Out', type: 'link', icon: 'sync_alt' },


  { state: 'employee/my-profile', name: 'My Profile', type: 'link', icon: 'account_circle' },
  { state: 'employee/my-it-declaration', name: 'IT Declaration', type: 'link', icon: 'content_copy' },
  { state: 'employee/proofof-investment', name: 'Proof Of Investment', type: 'link', icon: 'new_releases' },
  { state: 'employee/form-16', name: 'Form-16', type: 'link', icon: 'description' },
  { state: 'employee/investments', name: 'Investments', type: 'link', icon: 'check_circle_outline' },
 
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  {
    state: 'expansion',
    type: 'link',
    name: 'Expansion Panel',
    icon: 'vertical_align_center'
  },
  { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Progress snipper',
    icon: 'border_horizontal'
  },
  {
    state: 'progress',
    type: 'link',
    name: 'Progress Bar',
    icon: 'blur_circular'
  },

  {
    state: 'dialog',
    type: 'link',
    name: 'Dialog',
    icon: 'assignment_turned_in'
  },
  { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  {
    state: 'slide-toggle',
    type: 'link',
    name: 'Slide Toggle',
    icon: 'all_inclusive'
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
