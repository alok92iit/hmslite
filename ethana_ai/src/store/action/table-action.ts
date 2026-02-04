
import Api from "@/lib/apis"
import store from ".."

export const tableAction={
    getTable: (url:any,action:any  , show:any = 1):any => async () => {
        console.log(show)
        // if (shouldReset) {
        //     dispatch(CLEAR_RECORDS([]))
        // }
        // store.dispatch(SET_LOADER(true))
        const res = await Api.get({ url ,contentType : "application/json", show : 1})
        if (res.status !== 200) return

        store.dispatch(action(res.data?.data || []))
        // store.dispatch(SET_LOADER(false))

    }}