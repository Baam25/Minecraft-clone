import { useEffect, useState } from "react"
import { useStore } from '../hooks/useStrore'
import { UseKeyboard } from '../hooks/useKeyboard'
import {dirtImg,grassImg,glassImg,woodImg,logImg} from '../images/images'

const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    wood: woodImg,
    log: logImg
}


export const TextureSelector = () => {
    const [visible, setVisible] = useState(false)
    const [activeTexture, setTexture] = useStore(state => [state.texture, state.setTexture])
    const { dirt,
        grass,
        glass,
        wood,
        log} = UseKeyboard()
    
    useEffect(()=> {
        const textures = { dirt,
            grass,
            glass,
            wood,
            log
        }

        const pressedTexture = Object.entries(textures).find(([k,v]) => v)
        if (pressedTexture) {
            setTexture(pressedTexture[0])
        }
    }, [dirt, grass, glass, wood, log])
    useEffect(()=> {
        const visibilityTimeout = setTimeout(() => {
            setVisible(false)
        }, 2000);
        setVisible(true)
        return ()=> {
            clearTimeout(visibilityTimeout)
        }
    }, [activeTexture])
    return visible && (
        <div className = 'absolute centered texture-selector'>
            {Object.entries(images).map(([k,src])=>{
                return (<img 
                    src = {src} key = {k}
                    alt = {k}
                    className = {`${k === activeTexture ? 'active': ''}`}
                    />)
            })}
        </div>
    )
}