export interface StateResponse {
    state: boolean;
    message?: string;
}

export function StateError(message: string): StateResponse {
    return {
        state: false,
        message: message
    };
}