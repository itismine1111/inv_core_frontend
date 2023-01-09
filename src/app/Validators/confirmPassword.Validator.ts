import { AbstractControl } from "@angular/forms";

export function ConfirmPasswordValidator(control:AbstractControl){
    const password = control.get("password");
    const confirm_password = control.get("confirm_password");

    return password && confirm_password && password.value !== confirm_password.value ? {"passwordsDoNotMatch":true} : null;
}