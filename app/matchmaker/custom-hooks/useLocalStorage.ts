export const useLocalStorage = (key: string) => {
    
    const setItem = (value: unknown) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.warn(error)
        }
    }

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : undefined  
        } catch (error) {
            console.warn(error)
        }        
    }

    const removeItem = () => {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.warn(error)
        }
    }

    return {setItem, getItem}
};