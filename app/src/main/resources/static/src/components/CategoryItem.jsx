import { Dropdown, Button } from "@nextui-org/react"

export const CategoryItem =({children, setCategory})=>{
    return( <Dropdown.Item key="text"><Button onPress={setCategory} flat css={{"backgroundColor":"transparent"}}>{children}</Button></Dropdown.Item>)
}