import { Button, Input, InputRef, Space } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { FilterConfirmProps } from "antd/es/table/interface"
import { DataIndex, DataType } from "../types/dataType"
import Highlighter from "react-highlight-words"
import React from "react"

const getColumnSearchProps = (
  dataIndex: DataIndex,
  searchText: string,
  searchedColumn: string,
  searchInput: React.RefObject<InputRef>,
  handleSearch: (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => void,
  handleReset: (clearFilters: () => void) => void,
  setSearchText: (value: React.SetStateAction<string>) => void,
  setSearchedColumn: (value: React.SetStateAction<string>) => void,
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close,
  }: any) => (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() =>
          handleSearch(selectedKeys as string[], confirm, dataIndex)
        }
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false })
            setSearchText((selectedKeys as string[])[0])
            setSearchedColumn(dataIndex)
          }}
        >
          Filter
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close()
          }}
        >
          close
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: (value: string | number | boolean, record: DataType) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
  onFilterDropdownOpenChange: (visible: boolean) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100)
    }
  },
  render: (text: string) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    ) : (
      text
    ),
})

export default getColumnSearchProps
