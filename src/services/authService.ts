const API_URL = 'https://chat.snore.net/api/auth';


interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

interface VerificationPayload {
    email: string;
    code: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
}

/**
 * Gửi yêu cầu đăng ký tài khoản đến API.
 * @param {RegisterPayload} payload 
 * @returns {Promise<ApiResponse>} 
 */
export const register = async (payload: RegisterPayload): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (response.ok) {
            const data = await response.json();
            return { success: true, message: data.message || 'Đăng ký thành công!' };
        } else {
    
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Đăng ký thất bại.' };
        }
    } catch (error) {
        console.error("Lỗi khi gọi API đăng ký:", error);
        return { success: false, message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại.' };
    }
};

/**
 * Gửi yêu cầu xác nhận email bằng mã.
 * @param {VerificationPayload} payload 
 * @returns {Promise<ApiResponse>}
 */
export const verifyEmail = async (payload: VerificationPayload): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_URL}/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, message: data.message || 'Xác nhận thành công!' };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Mã xác nhận không hợp lệ.' };
        }
    } catch (error) {
        console.error("Lỗi khi gọi API xác nhận email:", error);
        return { success: false, message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại.' };
    }
};

/**
 * Gửi yêu cầu gửi lại mã xác nhận.
 * @param {string} email 
 * @returns {Promise<ApiResponse>} 
 */
export const resendVerificationCode = async (email: string): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_URL}/resend-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, message: data.message || 'Đã gửi lại mã thành công.' };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Gửi lại mã thất bại.' };
        }
    } catch (error) {
        console.error("Lỗi khi gửi lại mã xác nhận:", error);
        return { success: false, message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại.' };
    }
};
