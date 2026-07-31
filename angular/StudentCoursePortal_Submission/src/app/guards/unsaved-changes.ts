import { CanDeactivateFn } from '@angular/router';

export interface ComponentWithForm {
  hasUnsavedChanges?: () => boolean;
  enrollForm?: { dirty: boolean };
}

export const unsavedChangesGuard: CanDeactivateFn<ComponentWithForm> = (component) => {
  if (component.hasUnsavedChanges && component.hasUnsavedChanges()) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  if (component.enrollForm && component.enrollForm.dirty) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
