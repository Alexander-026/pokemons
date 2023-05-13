import { Avatar, Col, Modal, Row, Typography } from "antd"
import { FC } from "react"
import { IPokemon } from "../../types/pokemonResult"
import styles from "./ModalPokemon.module.scss"

type ModalPokemonProps = {
  pokemon: IPokemon | null
  onCancel: () => void
}

const ModalPokemon: FC<ModalPokemonProps> = ({ pokemon, onCancel }) => {
  return (
    <Modal centered footer={false} open={!!pokemon} onCancel={onCancel}>
      <Row
        className={styles.pokemon}
        justify={"center"}
        align={"middle"}
        gutter={0}
      >
        <Col span={24}>
          <Typography.Title level={2} italic>
            {pokemon?.name}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Avatar size={150} src={pokemon?.img} />
        </Col>
        {pokemon &&
          Object.keys(pokemon).map(
            (key, index) =>
              index > 2 && (
                <Col key={key} className={styles.pokemonStats} span={24}>
                  <Typography.Text code italic>
                    {key.toLocaleUpperCase()}
                  </Typography.Text>
                  <Typography.Text mark className={styles.pokemonStatsValue}>
                    {pokemon[key]}
                  </Typography.Text>
                </Col>
              ),
          )}
      </Row>
    </Modal>
  )
}

export default ModalPokemon
