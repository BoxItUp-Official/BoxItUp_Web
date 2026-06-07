import { createBox } from '../../actions'
import BoxForm from '../BoxForm'

export default function NewBoxPage() {
  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>Add a box</h1>
          <p>Create a new surprise box listing for customers to discover.</p>
        </div>
      </div>
      <BoxForm action={createBox} />
    </>
  )
}
