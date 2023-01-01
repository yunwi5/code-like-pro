// If empty string, is returned that means it is valid.
// If non-empty string is returned, that indicates the error message.
export function invalidateEmail(email: string) {
    if (!email) return 'Email is required!';
    if (email.length < 6) return 'Email should be at least 6 characters.';
    return '';
}

export function invalidateUsername(name: string) {
    if (!name) return 'Name is required!';
    if (name.length < 3) return 'Username is too short! At least 3 characters.';
    return '';
}

export function invalidatePassword(pass: string) {
    if (!pass) return 'Password is required!';
    if (pass.length < 7) return 'Password should be at least 7 characters!';
    return '';
}

export function invalidatePasswordConfirm(password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) return 'Password does not match!';
    return '';
}
