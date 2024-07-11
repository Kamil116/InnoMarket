import React from 'react'

export default function NotFound() {
    const error = {
        fontFamily: "Arial",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center"
    };
    const errorText = {
        backgroundColor: "aquamarine",
        width: '100%',
        textAlign: "center",
        padding: '50px 0'
    }
    return (
        <div style={error}>
            <div style={errorText}>
                <h1 >404 error: page not found</h1>
            </div>
        </div>
    )
}

