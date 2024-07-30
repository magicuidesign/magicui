import React from 'react'
import SpecialCard from '../magicui/special-card'

const specialcarddemo = () => {
  return (
    <div>
        <SpecialCard
        card={{
        coverImage: 'https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanposter.jpg',
        titleImage:'https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/pngwing1.png',
        characterImage:'https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanpng.png'
        }}
        />
    </div>
  )
}

export default specialcarddemo