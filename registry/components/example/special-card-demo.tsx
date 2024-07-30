import React from 'react'
import SpecialCard from '../magicui/special-card'

const specialcarddemo = () => {
  return (
    <div>
        <SpecialCard
        card={{
        coverImage: 'https://github.com/MihirJaiswal/hero-hq/blob/main/public/spidermanposter.jpg',
        titleImage:'https://github.com/MihirJaiswal/hero-hq/blob/main/public/pngwing1.png',
        characterImage:'https://github.com/MihirJaiswal/hero-hq/blob/main/public/spidermanpng.png'
        }}
        />
    </div>
  )
}

export default specialcarddemo