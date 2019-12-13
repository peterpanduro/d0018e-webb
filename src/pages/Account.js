import React, { useEffect } from 'react'
import Cookies from 'js-cookie';

export default function Account() {

    useEffect(() => {
        checkCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const checkCookie = () => {
        if (!Cookies.get("jwt")) {
            window.location.assign("/");
        }
    }

    return (
        <div>
            <p>Account page</p>
            <p>This page will only show when user is logged in</p>
        </div>
    )
}