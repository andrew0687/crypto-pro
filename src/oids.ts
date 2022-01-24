const oids = {
    '1.2.840.113549.1.9.2': 'UnstructuredName',
    '1.2.643.3.141.1.1': 'РНС ФСС',
    '1.2.643.3.141.1.2': 'КП ФСС',
    '1.2.643.3.131.1.1': 'ИНН',
    '1.3.6.1.5.5.7.3.2': 'Проверка подлинности клиента',
    '1.3.6.1.5.5.7.3.4': 'Защищенная электронная почта',
    '1.2.643.3.8.100.1': 'Сертификат типа "ekey-ГОСТ"',
    '1.2.643.3.8.100.1.1': 'Общее использование в системах ИОК без права заверения финансовых документов',
    '1.2.643.3.8.100.1.2': 'Передача отчетности по ТКС',
    '1.2.643.3.8.100.1.3': 'Оформление взаимных обязательств, соглашений, договоров, актов и т.п.',
    '1.2.643.3.8.100.1.4': 'Внутрикорпоративный документооборот',
    '1.2.643.3.8.100.1.5': 'Использование в системах электронной торговли',
    '1.2.643.3.8.100.1.6': 'Использование в торгово-закупочной системе "ЭЛЕКТРА"',
    '1.2.643.6.2.1.7.2': 'Использование физическим лицом в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских прав и обязанностей в отношении инвестиционных паев паевых инвестиционных фондов, в том числе отношения, связанные с учетом и/или фиксацией прав на инвестиционные паи паевых инвестиционных фондов',
    '1.2.643.6.2.1.7.1': 'Использование единоличным исполнительным органом юридического лица или уполномоченными представителями юридического лица в отношениях, связанных с возникновением, исполнением (осуществлением) и прекращением гражданских и иных прав и обязанностей в сфере негосударственного пенсионного обеспечения, негосударственного пенсионного страхования, в сфере деятельности паевых инвестиционных фондов, акционерных инвестиционных фондов, профессиональных участников рынка ценных бумаг, а также связанной с обслуживанием указанной деятельности услуг кредитных и иных организаций',
    '1.3.6.1.4.1.29919.21': 'Использование в системе Портал государственных закупок  Ростовской области "Рефери".',
    '1.2.643.3.2.100.65.13.11': 'Использование в системе АИС "Госзакупки" Сахалинской области.',
    '1.2.643.3.8.100.1.7': 'Использование в системе Портал государственных закупок Ставропольского края.',
    '1.2.643.3.8.100.1.8': 'Использование в Единой системе электронной торговли B2B-Center и B2G.',
    '1.2.643.3.8.100.1.9': 'Для участия в электронных торгах и подписания государственного контракта в  электронной площадке ОАО «ЕЭТП» уполномоченными лицами участников размещения  государственного или муниципального заказа',
    '1.2.643.3.8.100.1.10': 'Для участия в электронных торгах и подписания государственного контракта в  информационных системах Тендерного комитета города Москвы уполномоченными  лицами участников размещения государственного заказа города Москвы',
    '1.2.643.3.8.100.1.11': 'Подписание электронных документов в автоматизированной информационной  системе размещения государственного и муниципального заказа Саратовской области',
    '1.2.643.3.8.100.1.12': 'Использование в системе государственного заказа Иркутской области',
    '1.2.643.3.8.100.1.13': 'Использование в электронной торговой площадке агентства государственного  заказа Красноярского края',
    '1.3.6.1.4.1.24138.1.1.8.1': 'Обеспечение юридической значимости в Системе "Электронная Торговая Площадка"',
    '1.2.643.3.8.100.1.14': 'Использование в электронной торговой площадке "Тендер"',
    '1.2.643.6.3': 'Использование в электронных торговых системах и в программном обеспечении, связанным с обменом электронных сообщений',
    '1.2.643.2.2.34.6': 'Пользователь Центра Регистрации',
    '1.2.643.2.39.1.1': 'Использование в программных продуктах системы "1С:Предприятие 8"',
    '1.2.643.5.1.24.2.1.3': 'Формирование документов для получения государственных  услуг в сфере ведения государственного кадастра недвижимости со стороны заявителя',
    '1.2.643.5.1.24.2.1.3.1': 'Формирование кадастровым инженером документов  для получения государственных услуг в сфере ведения государственного кадастра недвижимости со стороны  заявителя',
    '1.2.643.5.1.24.2.2.2': 'Формирование документов как результата оказания  услуги со стороны органов регистрации прав',
    '1.2.643.5.1.24.2.2.3': 'Формирование документов для получения государственных  услуг в сфере государственной регистрации прав на недвижимое имущество и сделок с ним со стороны заявителя',
    '1.2.643.6.3.1.1': 'Использование на электронных площадок отобранных для проведения аукционах в электронной форме',
    '1.2.643.6.3.1.2.1': 'Тип участника - Юридическое лицо',
    '1.2.643.6.3.1.2.2': 'Тип участника - Физическое лицо',
    '1.2.643.6.3.1.2.3': 'Тип участника - Индивидуальный предприниматель',
    '1.2.643.6.3.1.3.1': 'Участник размещения заказа',
    '1.2.643.6.3.1.4.1': 'Администратор организации',
    '1.2.643.6.3.1.4.2': 'Уполномоченный специалист',
    '1.2.643.6.3.1.4.3': 'Специалист с правом подписи контракта',
    '1.3.643.3.8.100.15': 'Использование в ЭТП "uTender"',
};
export default oids;
