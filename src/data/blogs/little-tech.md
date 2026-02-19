---
date: "2026-02-18"
title: "Kat's Ultimate Self-hosting, Data Privacy, and Anti Big Tech Toolkit"
header: "Kat's Ultimate Self-hosting, Data Privacy, and Anti Big Tech Toolkit"
description: "A review of the tools I'm using and how. And why."
keywords: "selfhost, data privacy, degoogle, tech, technology, big tech, open source"
toc: true
poem: false
---

I have always been a fan of self-hosting, I've hosted Minecraft servers since the age of ten - but I always found myself using free cloud services because of convenience and integration. Around 2022, open source self hosted applications really started to pick up steam. They don't suck anymore, and they have widely available modern clients that do the same job as a cloud service - at least that's around when I started noticing. Come 2025, data privacy has become a topic that is increasingly pressing and relevant, especially with the further growth of the surveillance state with things like Flock and the co-opting of Big Tech data for government use. The government's dependence on social platforms for profile data has entered plain sight, with things like the TikTok forced buyout proving their hunger for data.

This, and a growing frusturation with changes made to cloud platforms (e.g. enshittification) and a general distaste for Big Tech has thrown me deep into the world of selfhosting, degoogling, and data privacy.

I'm writing this to share my toolkit and the path that I've forged myself, in a hope that this list of applications, tools, and methods can be useful for someone engaging on their own journey. The best thing I have found in this journey is that I have learned so much about the open internet, deepened my Linux administration knowledge, and begun to love using computers in a way that has been missing for me recently.

Let's get started.

## VPS

The first thing to do is choose between two options (or both, if you're wild like that!)

1. VPS / Cloud hosting with a globally routed IP address and rented hardware
2. Residential internet hosting on owned hardware with a VPN behind NAT.

Whether residential hosting works for you is entirely dependent on the types of services you want to host and how you use them, plus if you are looking to keep services behind a VPN. I have gone the route of 100% VPS/Global IP hosting, especially because I am comfortable with maintaining the security of such a device, and I want to run a mail transfer agent, which requires you to have a globally routable IP address with DNS set up, and most residential internet providers don't like you hosting a mail server.

It's important to note that there is a risk to keeping things exposed on the internet. They will get attacked by automatic exploit bots, so you need to keep them up to date and ensure you don't misconfigure them. You will also be required to set up TLS for any semblance of data privacy, because unencrypted data over the internet is problematic.

My review will now continue with VPS hosting. I use [Hetzner](https://www.hetzner.com/), specifically a CPX32, because they offer decent pricing and individual consumer-friendly contracts + an actual SLA. I used to use [Contabo](https://contabo.com/en-us/), but the thing about them is they really seem to oversell RAM, their support sucks, and they don't have an SLA. It's hit or miss, but I used them for 6 years and had almost zero issues. Their portal is pretty bad though, and migrating/resizing devices requires a full reinstall unless you want to pay a $30 "handling" fee. I recently migrated to Hetzner, but they place restrictions on new accounts being able to send outbound traffic over port 25 (SMTP) - blocking outbound email if you selfhost it. You have to wait a month and explain your use case. Most major cloud providers have this restriction because people abuse their IPs - the Hetzner IP I received already was listed on a blacklist (Barracuda), luckily I was able to remove it by filling out their unlisting form (then pestering them by email, because they ignored that form).

Something I have taken a recent interest in for my less technical friends is [PikaPods](https://www.pikapods.com/apps). They will fully manage servers running open source applications for you with support for custom domains on a globally routed network. It's a really unique service that could benefit those with a love for open source but less desire to administer servers.

## Rapid Fire Replacements

Now let's rapid fire some changes I've made:

* Windows 11 -> Linux ([CachyOS](https://cachyos.org/) - Arch, BTW)
* Gmail -> Selfhosted email server (postfix + dovecot + a LOT of security configuration) + Thunderbird (Linux & Android) - I will have to elaborate on this because this one is horribly complex.
* Google Maps Timeline (Location History) -> Owntracks
* Google Calendar -> [Radicale](https://radicale.org/v3.html) (CalDAV server) + Thunderbird (Linux) + [DavX5](https://www.davx5.com/) (Android) + Fossify Calendar (Android)
* Google Contacts -> Same as above but using Fossify Contacts on Android
* Google Tasks -> Same as above but using jtx Board on Android
* Google Drive / Any cloud file storage except MEGA which is E2EE -> [copyparty](https://github.com/9001/copyparty) WebDAV server + rclone mount (Linux) + DavX5 mount (Android)
* Google Keep -> I have yet to find a suitable replacement that looks and feels similar enough. [Quillpad](https://github.com/quillpad/quillpad) is really close, but the WebDAV filesystem sync just does not work, making it impossible to back up automatically, and it doesn't have a web or desktop client which is a requirement for me.
* Google Photos -> I haven't decided yet, but [Ente Photos](https://ente.io/) and [Immich](https://immich.app/) are both fantastic in different ways. I lean toward Ente Photos for the end-to-end encryption.
* Google Translate -> [Libretranslate](https://libretranslate.com/) + Crow Translate (Linux) is a great way to keep your translated text locally / on a trusted server. On Android, there is [Offline Translator](https://f-droid.org/packages/dev.davidv.translator/)
* Google Docs, Microsoft Word, Excel, Google Sheets, etc. -> LibreOffice. It's surprisingly usable now compared to last time I tried using them. Sync it on your WebDAV mount of copyparty and you've got the cloud at your fingertips!
* No budget software or YNAB (You Need a Budget) -> [Actual Budget](https://actualbudget.org/) + [SimpleFIN bridge](https://beta-bridge.simplefin.org/) for bank account transaction sync at a small cost
* Google Pixel Launcher (Home screen) -> [Lawnchair](https://lawnchair.app/) + Snow icon pack
* Chrome Remote Desktop -> KDE Connect
* Google Search -> [DuckDuckGo](https://github.com/9001/copyparty), with AI stuff turned off. You can create a sync code for using settings on new devices.
* Cloudflare DNS -> dnscrypt-proxy + unbound using oDoH through an anonymized relay
* [Mullvad VPN](https://mullvad.net/) with Wireguard (Linux), the only VPN worth using
* partiful -> I just wrote my own called [rsvp-micro](https://github.com/itsmeow/rsvp-micro) that connects with my email server and then wrote an HTML page for advertise the event on the same domain that has a form for this backend service.
* Any other password manager / no password manager -> [Vaultwarden](https://github.com/dani-garcia/vaultwarden), a wonderful selfhosted open-source backend implementing the Bitwarden client protocol.
* Any other browser -> Firefox (or LibreWolf), with uBlock Origin, Enhanced Tracking protection enabled, Decentraleyes, Privacy Badger, and ClearURLs.
* Instagram. God I love Instagram, but it's killing my brain. I can't delete it, because I keep up with so many friends there, but there is an extension called [IGPlus](https://github.com/ptjaworski/igplus-extension) that you can install on Firefox for Android, uninstall the app, and install the webpage as a [Progressive Web App](https://web.dev/learn/pwa/progressive-web-apps/). This lets you disable algorithmic content, reels, and lots of other negative functionality.
* Docker. Hey, Docker's cool and all, but it's not exactly the "open" container format it should be (Docker Desktop). On my server, I use **podman**, which uses containerd and crun. I really like the [Quadlet](https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html) format since it allows containers to be managed with systemd and podman has really simple auto update setups. I also run all my containers as rootless containers with [passt](https://passt.top/passt/about/), so even in the event of an application escaping the container it is still an unprivileged user.
* GBoard -> HeliBoard
* Google Speech to Text -> Whisper
* Google File Browser -> Material Files
* Google Lens -> Binary Eye
* Google Authenticator -> Bitwarden/Vaultwarden, or Aegis
* Google Maps (for directions only) -> CoMaps / OSM
* Google Messages / SMS / Discord / WhatsApp / WeChat -> Signal (if you can convince your friends, lol...)
* VSCode -> VSCodium / Code-OSS + OpenVSX

## Email

God, email. What a terrible protocol it was initially! There's practically zero security, guarantees of validity, confidentiality, or identity built into email itself. With default configurations, you can receive mail from potentially anywhere with almost zero validation of who the sender is.

In order to have email that actually works you need to set up (on both the receiving and sending portion):

* A TLS certificate
* SPF
* DKIM
* DMARC
* ARC (optional)
* DANE + DNSSEC (optional)
* TLSRPT (optional)
* MTA-STS (optional)

Not to mention that setting these up on the postfix side is NOT a simple process, especially setting it up securely. On top of this you're going to want a spam agent like rspamd (or the older SpamAssassin), or hook up some DNS DBLs like SpamHaus, except to use those you HAVE to set up unbound + qname minimization + an upstream resolver that isn't Google or Cloudflare, because they ban people who resolve from public resolvers which breaks email delivery.

Here's a list of agents I have to set up for my mail to be deliverable / to validate inbound mail:

* opendkim + publish DNS keys to send DKIM signed mail
* SPF record DNS + an SPF validator, I use postfix-policyd-spf-python
* opendmarc to validate DKIM and SPF and act according to the sender's DMARC policy
* postfix-tlspol to deliver according to MTA-STS policy
* openarc ([flowerysong fork](https://github.com/flowerysong/OpenARC/)) to validate ARC / ARC-Authentication-Results and seal outbound mail
* PostSRSd if you want to forward mail anywhere outside your domain (not recommended)

Not to mention, configuring postfix to even use all of these properly is a task, especially since, for example, OpenARC will send your email client's IP happily if you don't [*run two daemons and vary it based on if the user is authenticated*](https://github.com/flowerysong/OpenARC/issues/37).

It's super easy to misconfigure, and the default TLS settings are garbage. Dovecot is equally annoying to set up because it suffers from overcomplicated documentation and not enough examples, just like Postfix. The things are built to accommodate everyone, and in doing so, fail to accommodate anyone.

Because of how annoying all this is to set up, I recommend you use [mailcow](https://docs.mailcow.email/). It's a fully configured mail system that you can run on Docker and has all the proper configurations for each portion of an entire mail system. Or you can just use Proton Mail, that works too. If you trust them.

That is also not accounting for the fact that some senders just don't follow specifications properly and you'll inevitably lose mail due to their misconfigurations or your server being offline, so you should also set up a backup MX host, and don't reject spam, send it to a spam box instead.

Should I mention that Google is also piloting a NEW protocol extension for forwarding mail called [Declare All Recipients and Affirm (DARA)](https://www.ietf.org/archive/id/draft-chuang-replay-resistant-arc-11.html), which breaks OpenDMARC!?!? Yes, they're SENDING MAIL with an INTERNET DRAFT protocol header inside. So silly. Stop it, Google...

### Thunderbird Extensions

I really like Thunderbird, and there's a few extensions I feel are necessary:

* DKIM Verifier: Shows DKIM and SPF authentication results from your server (when configured to do so), so you can see if mail is actually signed by the sender
* Paranoia: Shows you the encryption used by each step in the delivery path, and informs you of any large companies that it passed through, so you can see if the mail was delivered over the internet in cleartext.

Here's a fun example of Paranoia - looks like Tumblr sent my mail unencrypted internally but it was encrypted on the way to my server:

✓ LMTPS: vps2.itsmeow.dev (using ==> vps2.itsmeow.dev
✓ ESMTPS: smtp6-3.dca.tumblr.com ==> vps2.itsmeow.dev
✗ ESMTP: smtp-outbound.tumblr.net ==> smtp6.tumblr.dca.wordpress.com

And also let me say, Tumblr is the only social media I actually enjoy using lately. I have control over tags I see, there's lots of great fandom content... do recommend. You can't have my blog name though.

The other extensions I have are Copy Folder
 and ImportExportTools NG, both of which I used to copy my old GMail inboxes (from Google Takeout) into my IMAP server (and then I deleted the mail from GMail).

## Backups

Backups are fun, and have given me a lot of peace of mind. My current setup is a shell script attached to a cron job that uses [Borg](https://borgbackup.readthedocs.io/) to create a deduplicated, encrypted volume on my system that can then be synced to [Backblaze](https://www.backblaze.com/) for cheap bulk object storage.

The deduplication works across versions, so you only save new data every time even though your script can just copy everything into the backup. This makes it straightforward to have incremental backups that contain whole snapshots of the data on your system.

All of my configurations are managed by a git repo that contains the necessary files and shell scripts to install the components required to run my services, as well as managing/creating/updating secret values in configurations. This way I have a backup of my configs (the git repo being a source of truth) and my data (on Backblaze). This also gives the advantage that I can copy just about any file into my copyparty mount on my computer, it syncs to my server, which will then back it up encrypted (at the server) at the end of the day.

## Translation

Offline translation is something I'm really interested in, and the solutions right now are pretty limited, especially for UX, and especially if you want end-to-end encryption when you're messaging translated text. I have a friend who only speaks Mandarin, so we communicate entirely through translation - and we used to use WeChat but since I've become a bit of a data privacy nut I wanted to try using Signal. I soon realized that Signal has no builtin way to translate text, and Heliboard lacks a translator because they typically require network privileges. There are [open issues](https://github.com/Helium314/HeliBoard/issues/1232) about it, but it doesn't look like it's happening anytime soon. So copy pasting from [Offline Translator](https://f-droid.org/packages/dev.davidv.translator/) it is.

The other option is Signal for the desktop. For Linux users, you can get builtin system translation with [Crow Translate](https://apps.kde.org/crowtranslate/) for KDE. It's powerful, but it's designed to proxy through Mohzi, which just attempts to anonymize your translation text on the internet to public translation services. Luckily, the [devs are super receptive](https://invent.kde.org/office/crow-translate/-/issues?show=eyJpaWQiOiI3MzQiLCJmdWxsX3BhdGgiOiJvZmZpY2UvY3Jvdy10cmFuc2xhdGUiLCJpZCI6NTE1MjV9) to using LibreTranslate locally, and if you host Mohzi locally you can get it to work. Hopefully a more integrated solution will exist soon.

## Philosophical, Personal, and Economic Reasons for hating Big Tech

I wrote a giant hate post about this elsewhere, but I'd like to link to some very good articles that sort of enumerate why I feel this way.

* [I'm an American software developer and the "broligarchs" don't speak for me](https://ratfactor.com/tech-nope)
* [Never Forgive Them](https://www.wheresyoured.at/never-forgive-them/)
* ["You can't code away their wealth".](www.youtube.com/watch?v=FEU632_Em3g)

## Conclusion

If you liked my article, have suggestions or thoughts, new tools, or simply want advice on how to implement some of this for yourself feel free to send me an email (click on the envelope on my homepage)! I would love to hear from you.
