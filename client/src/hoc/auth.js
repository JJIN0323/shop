import React, { useEffect } from 'react'
import { auth } from '../_actions/user_actions'
import { useSelector, useDispatch } from 'react-redux'

export default function authentication(SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user)
        const dispatch = useDispatch()

        useEffect(() => {
            // 인증요청 보내기
            dispatch(auth()).then(response => {
                // 인증에 실패하면 다시 로그인 페이지로 보냄
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                    // 인증에 성공하면 메인페이지로 보냄
                } else {
                    // 관리자가 아닌 사람이 관리자 페이지로 접속하면 메인페이지로 보냄
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    // 로그인된 상태면 메인페이지로 보냄
                    else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [dispatch, props.history, user.googleAuth])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


