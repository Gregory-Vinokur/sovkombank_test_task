import './WinnerItem.styles.css'
import {WinnerItemProps} from './WinnerItem.types'

const WinnerItem = ({text}: WinnerItemProps) => {
  return (
    <div className="winner_item">
      <span className="winner_item__text">{text}</span>
    </div>
  )
}

export {WinnerItem}
