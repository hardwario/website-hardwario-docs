import React, {useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

// HARDWARIO ThingsBoard integration that creates the device and moves it to the
// customer who owns the device group. The group id is a random UUID visible only
// to users who can see the group, so the URL itself needs no secret.
const ENDPOINT = 'https://app.hardwario.cloud/api/v1/integrations/http/906ec623-ea0e-48f3-8541-c53bdc40fe96';

// Accept the bare id or the whole address of the group page; the id is the last UUID in it.
const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;

const TEXT = {
  en: {
    label: 'Device group ID',
    placeholder: '144424b0-6336-11f1-b26d-7f43ae666fcf',
    hint: 'Paste the ID copied with "Copy entity group Id". The address of the group page works too.',
    invalid: 'No device group ID found yet. It looks like 144424b0-6336-11f1-b26d-7f43ae666fcf.',
    check: (id) => `Devices will be added to your device group ${id}.`,
    waiting: 'Paste the group ID above and the transformation code appears here, ready to copy.',
    codeTitle: 'Transformation function',
    comment1: 'YOUR THINGSBOARD DEVICE GROUP ID',
    comment2: 'Do not change anything below.',
  },
  cs: {
    label: 'ID skupiny zařízení',
    placeholder: '144424b0-6336-11f1-b26d-7f43ae666fcf',
    hint: 'Vložte ID zkopírované tlačítkem „Copy entity group Id“. Funguje i adresa stránky skupiny.',
    invalid: 'Zatím jsme nenašli ID skupiny. Vypadá třeba takto: 144424b0-6336-11f1-b26d-7f43ae666fcf.',
    check: (id) => `Zařízení se přidají do vaší skupiny zařízení ${id}.`,
    waiting: 'Vložte nahoře ID skupiny a tady se objeví kód transformace připravený ke zkopírování.',
    codeTitle: 'Transformační funkce',
    comment1: 'ID VAŠÍ SKUPINY ZAŘÍZENÍ V THINGSBOARD',
    comment2: 'Níže nic neměňte.',
  },
};

function script(groupId, t) {
  return `/** @param {Job} job */
// ==============================================================
// ${t.comment1}
var TB_GROUP_ID = ${JSON.stringify(groupId)};
// ==============================================================
// ${t.comment2}
// @hc-auto-onboarding
function main(job) {
    return {
        method: "POST",
        url: "${ENDPOINT}",
        header: { "Content-Type": "application/json" },
        data: {
            group_id: TB_GROUP_ID,
            device: job.device,
            message: job.message
        }
    };
}`;
}

export default function ThingsBoardConnector() {
  const {i18n} = useDocusaurusContext();
  const t = TEXT[i18n.currentLocale] || TEXT.en;
  const [input, setInput] = useState('');
  const ids = input.match(UUID_RE) || [];
  const groupId = ids.length ? ids[ids.length - 1].toLowerCase() : '';

  return (
    <div className={styles.box}>
      <label className={styles.label} htmlFor="tb-group">{t.label}</label>
      <input
        id="tb-group"
        className={styles.input}
        type="text"
        spellCheck={false}
        placeholder={t.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p className={styles.hint}>{t.hint}</p>
      {input.trim() && !groupId && <p className={styles.invalid}>{t.invalid}</p>}
      {groupId ? (
        <>
          <p className={styles.check}>{t.check(groupId)}</p>
          <CodeBlock language="js" title={t.codeTitle}>{script(groupId, t)}</CodeBlock>
        </>
      ) : (
        <p className={styles.waiting}>{t.waiting}</p>
      )}
    </div>
  );
}
