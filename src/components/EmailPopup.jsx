import { FaKey } from "react-icons/fa6"
import IconHeader from "./iconHeader"
import Modal from "./modal"

const EmailPopup = ({ close }) => {
  return (
    <Modal title="EMAIL & PGP" close={close}>
      <a href="mailto:kat@katdev.net" aria-label="OpenPGP Key">
        kat@katdev.net
      </a>
      <br />
      <br />
      <IconHeader
        text="PGP"
        icon={
          <a
            href="/kat_pubkey.pgp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="OpenPGP Key"
          >
            <FaKey className="glow-icon" aria-label="OpenPGP Key" />
          </a>
        }
      />
      <pre>
        <code>{`Fingerprint: E58DEDB6B8C845136CA9F027C1C3434600A66860
Certification: C1C3434600A66860 Kat S <kat@katdev.net>
Valid from:	1/16/26 10:13 PM PST (UTC-8)
Valid until:	1/16/29 12:00 PM PST (UTC-8)`}</code>
      </pre>
      <h5>Key</h5>
      <pre>
        <code>{`-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEaWsomhYJKwYBBAHaRw8BAQdABbywusgYnRZlAek54r4HYhEGfZSa8a48HVHU
okPSEF/NFkthdCBTIDxrYXRAa2F0ZGV2Lm5ldD7ClgQTFgoAPhYhBOWN7ba4yEUT
bKnwJ8HDQ0YApmhgBQJpayiaAhsDBQkFpFwmBQsJCAcCBhUKCQgLAgQWAgMBAh4B
AheAAAoJEMHDQ0YApmhg9lcA/2o/xRVGkj1AT6s9AoVfZ6EMoN9GQDvH9cA1ZynF
KGqRAP41ZKy/fcyTrlOYfSql+dYcpjWI7H4kKBnPdHiTQ2+6A84zBGlrKLQWCSsG
AQQB2kcPAQEHQMaah8iJvPzcSHut/5ipB2HbMhulSglElAANXT11cMS1wn4EGBYK
ACYWIQTlje22uMhFE2yp8CfBw0NGAKZoYAUCaWsotAIbIAUJBaOzTAAKCRDBw0NG
AKZoYK4+AQCGzvHmNYevgYSTJbb+HJghpbEaP8aRXOZ/pegLH140bQD/Y6/p0f66
Ke8qj1ngofbno2lEryKlTE2icdb+qaO7FwbOOARpayiaEgorBgEEAZdVAQUBAQdA
fvpd9jaNWjteFqfBm9af1eVhgiQhA+gZoLtii3qoEEkDAQgHwn4EGBYKACYWIQTl
je22uMhFE2yp8CfBw0NGAKZoYAUCaWsomgIbDAUJBaRcJgAKCRDBw0NGAKZoYA2I
AP9ySFlJXc0uNxMTxKlxKxJ9i5qUI7Cj+t5nHlE6YXZpSwEAyfJF9sO6rKgNBh86
j2vrt9ToMnA8TorwES7oAd4jhgk=
=HAuu
-----END PGP PUBLIC KEY BLOCK-----`}</code>
      </pre>
    </Modal>
  )
}

export default EmailPopup
