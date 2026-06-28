import { createClient } from '@/lib/supabase-server'
import { createBox } from '../../actions'
import BoxForm from '../BoxForm'

export default async function NewBoxPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>Add a box</h1>
          <p>Create a new surprise box listing for customers to discover.</p>
        </div>
      </div>
      <BoxForm action={createBox} userId={user?.id ?? null} />
    </>
  )
}
