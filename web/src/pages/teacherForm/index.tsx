import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

function TeacherForm() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const history = useHistory();


  const [scheduledItems, setScheduleItems] = useState([
    { week_day: '', from: '', to: '' },
  ]);
  function addNewScheduleItem() {
    setScheduleItems([...scheduledItems, { week_day: '', from: '', to: '' }])
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name, avatar, whatsapp, bio, subject, cost: Number(cost),
      schedule: scheduledItems
    }).then(() => {
      alert('Cadastro realizado com sucesso')
      history.push('/');
    }).catch(() => {
      alert('Erro ');
    });
  }

  function setScheduleItemValue(index: number, field: string, value: string) {
    const newArray = scheduledItems.map((scheduledItem, idx) => {
      if (idx === index) {
        return { ...scheduledItem, [field]: value };
      }
      return scheduledItem;
    })
    setScheduleItems(newArray);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description=" O primeiro passo é preencher o formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input name="name" label="Nome completo" value={name} onChange={e => setName(e.target.value)} />
            <Input name="avatar" label="Avatar" value={avatar} onChange={e => setAvatar(e.target.value)} />
            <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            <Textarea name="bio" label="Biografia" value={bio} onChange={e => setBio(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select name="subject" label="Matéria" value={subject} onChange={e => setSubject(e.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Quimica', label: 'Quimica' },
                { value: 'Matematica', label: 'Matematica' },
                { value: 'Fisica', label: 'Fisica' },
                { value: 'Portuges', label: 'Portugues' },
              ]} />
            <Input name="cost" value={cost} onChange={e => setCost(e.target.value)} label="Custo da sua hora por aula" />
          </fieldset>

          <fieldset>
            <legend>Horários Disponíveis
          <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
          </button>
            </legend>
            {scheduledItems.map((scheduleItem, index) => {
              return (
                <div className="schedule-item" key={scheduleItem.week_day}>
                  <Select name="week_day" label="Dia da semana" value={scheduleItem.week_day} onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)} options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda' },
                    { value: '2', label: 'Terça' },
                    { value: '3', label: 'Quarta' },
                    { value: '4', label: 'Quinta' },
                    { value: '5', label: 'Sexta' },
                    { value: '6', label: 'Sabado' },
                  ]} />
                  <Input name="from" label="Das" value={scheduleItem.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)} type="time" />
                  <Input name="to" label="Até" value={scheduleItem.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)} type="time" />
                </div>
              )
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante !  <br />
            Preencha todos os dados
          </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;