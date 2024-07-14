function decodeEmail(email: string) {
    return email.replace('_at_', '@').replace(',', '.')
}

export default decodeEmail;