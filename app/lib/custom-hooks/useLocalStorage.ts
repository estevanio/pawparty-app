export const useLocalStorage = () => {
    
    const setItem = (key: string, value: unknown) => {

        if (typeof(value) =='string') {
            try {
                window.localStorage.setItem(key, value)
            } catch (error) {
                console.warn(error)
            }
        }else {
            try {
                window.localStorage.setItem(key, JSON.stringify(value))
            } catch (error) {
                console.warn(error)
            }
        }        
    }

    const getItem = (key: string) => {
        try {
            const item = window.localStorage.getItem(key)
            if (typeof(item) == 'string'){
                return item                
            }
            
            return item ? JSON.parse(item) : undefined  
        } catch (error) {
            console.warn(error)
        }        
    }

    const removeItem = (key: string) => {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.warn(error)
        }
    }
    
    return {setItem, getItem, removeItem}
};