"use client";

import * as React from "react";
import { Toaster, toast as reactHotToast } from "react-hot-toast";

export const toast = reactHotToast;

export function ToastProvider() {
    return <Toaster position="top-right" reverseOrder={false} />;
}
