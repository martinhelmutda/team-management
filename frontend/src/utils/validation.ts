export function validateMemberForm(form: { first_name: string; last_name: string; email: string; phone_number: string; }) {
    const errors: { [k: string]: string } = {};

    if (!form.first_name.trim()) {
        errors.first_name = "First name is required";
    }
    if (!form.last_name.trim()) {
        errors.last_name = "Last name is required";
    }
    if (!form.email.trim()) {
        errors.email = "Email is required";
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            errors.email = "Please enter a valid email address";
        }
    }
    if (!form.phone_number.trim()) {
        errors.phone_number = "Phone number is required";
    } else {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(form.phone_number)) {
            errors.phone_number = "Phone number must be exactly 10 digits (numbers only)";
        }
    }
    return errors;
}

export async function parseApiError(res: Response) {
    let message = "An error occurred. Please try again.";
    let code = res.status;
    try {
        const data = await res.json();
        if (data?.detail) {
            message = data.detail;
        } else if (typeof data === "string") {
            message = data;
        } else if (typeof data === "object") {
            message = Object.values(data).flat().join(" ");
        }
    } catch {}
    return `Error ${code}: ${message}`;
}