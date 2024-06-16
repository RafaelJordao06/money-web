import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContexto } from "../../context.js";
import icons from "../../styles/icons.js";
import { api } from "../../services/api.js";
import "./home.css";


export default function Home() {
  const [despesas, setDespesas] = useState([]);
  const { busca, setVtotal, setShowBusca } = useContexto();

  const navigate = useNavigate();

  async function deleteDespesa(id) {
    if (!confirm('Confirma excluir despesa?')) return;

    try {
      await api.delete(`despesas/${id}`);

      listarDespesas(busca);
    }
    catch (error) {
      console.log(error.message);
      alert("Erro ao excluir despesa");
    }
  }

  function RenderDespesa({ despesa }) {
    return (
      <tr>
        <td>{despesa.id.toString().padStart(5, '0')}</td>
        <td>{despesa.descricao}</td>

        <td>
          <div>
            <img src={despesa.categoriaDetalhe.icon} alt={despesa.categoria} className="icon-sm" />
            <span className="ml-10">{despesa.categoria}</span>
          </div>
        </td>

        <td className="text-right">
          {
            Number(despesa.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          }
        </td>

        <td className="text-right">
          <button
            className="btn btn-blue rounded"
            onClick={() => navigate(`/despesa/${despesa.id}`)}
          >
            <img src={icons.edit} alt="Alterar" className="icon-sm" />
          </button>

          <button className="btn btn-red rounded ml-10" onClick={() => deleteDespesa(despesa.id)}>
            <img src={icons.remove} alt="Excluir" className="icon-sm" />
          </button>
        </td>
      </tr>
    )
  }

  async function listarDespesas(busca) {

    let config = {}
    console.log(busca);
    if (busca) {
      config.params = {
        descricao: busca
      }
    }

    try {
      const response = await api.get("despesas", config);

      setDespesas(response.data);
      const total = response.data.reduce((acc, item) => acc + Number(item.valor), 0);
      setVtotal(total);
    }
    catch (error) {
      console.log(error.message);
      alert("Erro ao buscar dados");
    }
  }

  useEffect(() => {
    setShowBusca(true);
    listarDespesas(busca);
  }, [busca])


  return (
    <div className="container-home">
      <div className="title-home">
        <h1>Despesas</h1>
        <button className="btn btn-green" onClick={() => navigate("/despesa/add")}>
          Adicionar Despesa
        </button>
      </div>

      {despesas.length
        ?
        <div className="box-despesa">
          <table>
            <thead>
              <tr>
                <th>ID Despesa</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th className="text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {
                despesas.map((despesa) =>
                  <RenderDespesa despesa={despesa} key={despesa.id} />
                )
              }
            </tbody>
          </table>
        </div>
        :
        <div className="empty-despesa">
          <img src={icons.empty} alt="Nenhuma despesa encontrada" />
          <p>Nenhuma despesa encontrada</p>
        </div>
      }
    </div>
  )
}