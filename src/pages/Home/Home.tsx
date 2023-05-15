import { useEffect, useCallback, useRef, useState } from "react"
import { Avatar, Col, InputRef, Row, Space, Table } from "antd"
import type { FilterConfirmProps } from "antd/es/table/interface"
import type { ColumnsType } from "antd/es/table"
import styles from "./Home.module.scss"
import { useGetPokemonsQuery } from "../../app/services/pocemon"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  setPokemons,
  selectPakemon,
  setPagination,
} from "../../features/pokemon/pokemonSlice"
import { packPakemons } from "../../utils/packPakemons"
import ModalPokemon from "../../app/components/ModalPokemon"
import { DataIndex, DataType } from "../../types/dataType"
import getColumnSearchProps from "../../utils/getColumnSearchProps"

const Home = () => {
  const { dataResults, pokemons, loading, selected, current, pageSize } =
    useAppSelector((state) => state.pokemons)
  const dispatch = useAppDispatch()
  useGetPokemonsQuery({
    offset: current > 1 ? pageSize * current - pageSize : 0,
    limit: pageSize,
  })

  const [searchText, setSearchText] = useState<string>("")
  const [searchedColumn, setSearchedColumn] = useState<string>("")
  const searchInput = useRef<InputRef>(null)

  const loadPokemons = useCallback(async () => {
    if (dataResults) {
      const { results } = dataResults
      const pokemonsdata = await packPakemons(results)
      dispatch(setPokemons(pokemonsdata))
    }
  }, [dataResults, dispatch])

  useEffect(() => {
    loadPokemons()
  }, [loadPokemons])

  const closeWindow = () => {
    dispatch(selectPakemon(null))
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText("")
  }
  const dataSourse: DataType[] = pokemons.map((p) => ({
    key: p.id,
    id: p.id,
    avatar: (
      <Space
        className={styles.pokemon}
        onClick={() => dispatch(selectPakemon(p))}
        wrap
      >
        <Avatar size={30} src={p.img} />
      </Space>
    ),
    name: p.name,
    hp: p.hp,
    type: p.type,
  }))

  const addFilters = (dataSourse: DataType[]): string[] => {
    const filters: string[] = []
    dataSourse.forEach((d) => {
      if (!filters.includes(d.type)) {
        filters.push(d.type)
      }
    })
    return filters
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5rem",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatart",
      width: "5rem",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "10rem",
      ...getColumnSearchProps(
        "name",
        searchText,
        searchedColumn,
        searchInput,
        (selectedKeys, confirm, dataIndex) =>
          handleSearch(selectedKeys, confirm, dataIndex),
        (clearFilters) => handleReset(clearFilters),
        (value) => setSearchText(value),
        (value) => setSearchedColumn(value),
      ),
    },
    {
      title: "Hp",
      dataIndex: "hp",
      key: "hp",
      width: "5rem",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "5rem",
      filters: addFilters(dataSourse).map((f) => ({ text: f, value: f })),
      onFilter: (value: string | number | boolean, record) =>
        record.type.indexOf(value as string) === 0,
    },
  ]

  return (
    <Row justify={"center"} align={"top"} className={styles.home}>
      <ModalPokemon pokemon={selected} onCancel={closeWindow} />
      <Col className={styles.homeContainer}>
        <Table
          tableLayout="fixed"
          className={styles.homeContainerTable}
          size="small"
          columns={columns}
          dataSource={dataSourse}
          loading={loading}
          scroll={{ y: "30rem" }}
          pagination={{
            pageSizeOptions: ["10", "20", "50"],
            position: ["bottomCenter"],
            total: dataResults?.count,
          }}
          onChange={(pagination, filters, sorted, extra) => {
            console.log("pagination", pagination)
            console.log("filters", filters)
            console.log("sorted", sorted)
            console.log("extra", extra)
            switch (extra.action) {
              case "paginate":
                dispatch(
                  setPagination({
                    current: pagination.current || 1,
                    pageSize: pagination.pageSize || 10,
                  }),
                )
                break
              case "filter":
                break
              case "sort":
                break
              default:
                break
            }
          }}
          bordered
        />
      </Col>
    </Row>
  )
}

export default Home

// 291
