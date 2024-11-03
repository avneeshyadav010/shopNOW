import Cookies from 'js-cookie';

export const setUser = (token, email) => {
    Cookies.set('token',token,{ expires: 2 });
    Cookies.set('email',email,{ expires: 2 });
};

export const getToken = () => {
    return Cookies.get('token');
}
export const getEmail = () => {
    return Cookies.get('email')
}

export const removeUser = () => {
    Cookies.remove('token');
    Cookies.remove('email')
}