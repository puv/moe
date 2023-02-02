import express from "express";

declare global {
    namespace Express {
        interface Request {
            _parsedUrl: {
                href?: string,
            }
            user: {
                settings: {
                    synopsis: boolean,
                }
            }
        }
    }
}