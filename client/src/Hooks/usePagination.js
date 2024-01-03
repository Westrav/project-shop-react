import { useEffect, useState } from "react"

export default (page = 1, limit = 3) => {

    const [buttons, setButtons] = useState([])
    const [pagination, setPagination] = useState({
        limit: limit,
        page: page,
        countItems: 0
    })
    const [contrlPag, setContrlPag] = useState({
        backPage: true,
        nextPage: true
    })

    const changeLimit = (limit) => {
        setPagination({...pagination,limit:limit})
    }
    const changePage = (page) => {
        setPagination({ ...pagination, page: page })
    }
    const getPage = () => pagination.page
    const getLimit = () => pagination.limit


    const setCountItems = (count) => setPagination({ ...pagination, countItems: count })

    useEffect(() => {
        const countButtons = Math.ceil(pagination.countItems / pagination.limit)

        let end = pagination.page

        if (pagination.page % 5 != 0) {
            while (true) {
                if (end % 5 == 0) {
                    break;
                }
                end++
            }
        }
        const arrButtons = []
        end -= 4

        for (let i = end; i < end + 5; i++) {
            arrButtons.push(i)
            if (countButtons == i) {
                break;
            }
        }

        let tmpPages = {backPage:false,nextPage:false}

		if(countButtons ==  pagination.page){
			tmpPages = {...tmpPages,nextPage:false} 
		}else{
			tmpPages = {...tmpPages,nextPage:true}
		}
		
		if(pagination.page == 1){
			tmpPages = {...tmpPages,backPage:false} 
		}else{
			tmpPages = {...tmpPages,backPage:true}
		}

		setContrlPag(tmpPages)
        setButtons(arrButtons)
    }, [pagination])

    return [buttons,contrlPag, { set: changePage, get: getPage },{set:changeLimit,get:getLimit}, setCountItems]
}