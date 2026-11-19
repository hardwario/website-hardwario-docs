# ember-first-steps.rsc - HARDWARIO EMBER setup, done by the gateway itself
# https://docs.hardwario.com/ember/automated-setup/ (manual way: https://docs.hardwario.com/ember/manual-setup/)
#
#   base configuration: name "ember", LAN bridge0 = ether2 + ether3 with 172.31.255.1/24,
#       DHCP client on ether1 (WAN), login note off
#       then the RouterOS update to the newest stable (System > Packages > Check for Updates, channel stable >
#       Download&Install)
#   iot package (only if it is missing)
#   the preconfigured LoRaWAN server entries removed
#   RouterBOARD firmware upgrade
#   a new random admin password (12 characters, shown in the terminal at the start) and a setup protocol in Files
#       (flash/ember-protocol.txt: the password and everything that is set, completed when the setup is done)
#
# The gateway restarts by itself (once or twice) and carries on after each restart.
# Nothing else is changed: no VPN, no firewall, no LoRaWAN server (those come with Step 3, the LoRaWAN backend).
# What is left of MikroTik's default configuration is removed (step 1.1 tells to remove it first): the address
# 192.168.88.1/24 on ether1, or, after a reset that put all ports into bridge "bridgeLocal", that bridge and its
# DHCP client, so that ether1 can be the WAN port and ether2/ether3 the LAN.
#
# Before: remove the MikroTik default configuration and log in (Automated Setup, step 1.1). ether1 (WAN) in a network with DHCP and internet.
# Run:    Winbox > Files > drag this file in. Terminal: /import file-name=ember-first-steps.rsc
# Follow: Winbox > Log. Finished when it shows "ember-first-steps: DONE" (about 12 minutes).

# already running? Then this import changes nothing.
:if ([:len [/system script job find where script="ember-first-steps"]] > 0) do={
  :put "ember-first-steps: already running. Wait until the Log shows ember-first-steps: DONE (or STOPPED)."
  :error "ember-first-steps: already running"
}

# ----- new admin password, the setup protocol, and the start -----
# 12 random characters without look-alikes (0/O, 1/l/I), so it can be read off the screen. It is saved in the
# protocol file, the setup is started (it waits 2 minutes), the password is shown, and only then set: so the
# setup runs even if the password cannot be set, and the terminal shows it before anything disconnects Winbox.
{
  :local chars "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789"
  :local pw ""
  :for i from=1 to=12 do={ :set pw ($pw . [:pick $chars [:rndnum from=0 to=([:len $chars] - 1)]]) }
  :local pf "ember-protocol.txt"
  :if ([:len [/file find where name="flash"]] > 0) do={ :set pf "flash/ember-protocol.txt" }
  :local nl "\r\n"
  :if ([:len [/user find where name="admin"]] = 0) do={
    :put "ember-first-steps: STOPPED, there is no user admin. Nothing was changed."
    :error "ember-first-steps: no user admin"
  }
  # /file add is not in every RouterOS 7 version (hence :parse); the older way is /file print file=
  :do {
    :if ([:len [/file find where name=$pf]] = 0) do={
      :do { :local f [:parse ("/file add name=\"" . $pf . "\" type=file")]; $f } on-error={ /file print file=[:pick $pf 0 ([:len $pf] - 4)] }
      :local w 0
      :while (([:len [/file find where name=$pf]] = 0) && ($w < 10)) do={ :delay 1s; :set w ($w + 1) }
    }
    /file set [/file find where name=$pf] contents=("HARDWARIO EMBER - setup protocol" . $nl . $nl . "Setup started " . [/system clock get date] . " " . [/system clock get time] . " (EMBER clock). This file is completed when the setup is done." . $nl . $nl . "Login" . $nl . "  User: admin" . $nl . "  Password: " . $pw . $nl)
  } on-error={}
  :local saved false
  :do { :if ([/file get [/file find where name=$pf] contents] ~ $pw) do={ :set saved true } } on-error={}
  :if (!$saved) do={
    :put "ember-first-steps: STOPPED, the setup protocol could not be saved in Files. Nothing was changed."
    :error "ember-first-steps: protocol file"
  }
  /system scheduler remove [find where name="ember-first-steps"]
  /system script remove [find where name="ember-first-steps"]
  /system script add name=ember-first-steps comment="0" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source={
    :local me "ember-first-steps"
    :local say do={ :log info ("ember-first-steps: " . $1) }

    # starts of this run (kept in the script's comment); normally 3, more means something keeps failing
    :local n ([:tonum [/system script get [find where name=$me] comment]] + 1)
    /system script set [find where name=$me] comment=$n
    :if ($n > 6) do={
      $say "STOPPED: started 6 times without finishing. Send the Log to HARDWARIO support, or drag the file in again and import it."
      /system scheduler remove [find where name=$me]
      :error "ember-first-steps: too many starts"
    }
    $say ("start " . $n . " on RouterOS " . [/system resource get version])
    # the terminal shows the new admin password now: time to write it down before anything disconnects Winbox
    :if ($n = 1) do={
      $say "waiting 2 minutes, so the new admin password from the terminal can be written down"
      :delay 120s
    }

    # ----- base configuration -----
    /system identity set name=ember
    # ether1 is the WAN port. A reset with the button held longer puts all ports into bridge "bridgeLocal" with a
    # DHCP client on it: ether1 leaves that bridge, and the bridge's default DHCP client goes with it.
    :foreach bp in=[/interface bridge port find where interface="ether1"] do={
      :local b [/interface bridge port get $bp bridge]
      /ip dhcp-client remove [find where interface=$b and comment="defconf"]
      /interface bridge port remove $bp
    }
    :if ([:len [/interface bridge find where name="bridge0"]] = 0) do={ /interface bridge add name=bridge0 }
    :foreach p in={"ether2";"ether3"} do={
      :local bp [/interface bridge port find where interface=$p]
      :if ([:len $bp] = 0) do={
        /interface bridge port add bridge=bridge0 interface=$p
      } else={
        :if ([/interface bridge port get $bp bridge] != "bridge0") do={ /interface bridge port set $bp bridge=bridge0 }
      }
    }
    # MikroTik's default address 192.168.88.1/24 on ether1 (left when "OK" was clicked instead of "Remove Configuration")
    :foreach a in=[/ip address find where comment="defconf" and address="192.168.88.1/24"] do={
      :do {
        :local ad [/ip address get $a address]
        :local ifc [/ip address get $a interface]
        /ip address remove $a
        $say ("removed the MikroTik default address " . $ad . " from " . $ifc)
      } on-error={}
    }
    # the reset's own bridge is empty now (only tidying up: a failure here does not stop the run)
    :foreach b in=[/interface bridge find where comment="defconf"] do={
      :do {
        :if ([:len [/interface bridge port find where bridge=[/interface bridge get $b name]]] = 0) do={ /interface bridge remove $b }
      } on-error={}
    }
    :if ([:len [/ip address find where address="172.31.255.1/24" and interface="bridge0"]] = 0) do={
      /ip address add address=172.31.255.1/24 interface=bridge0 network=172.31.255.0
    }
    :if ([:len [/ip dhcp-client find where interface="ether1"]] = 0) do={ /ip dhcp-client add interface=ether1 disabled=no }
    /system note set show-at-login=no
    $say "base configuration done"

    # ----- internet (ether1 DHCP needs a moment; up to 5 min) -----
    :local net false
    :local w 0
    :while ((!$net) && ($w < 300)) do={
      :do { :resolve "upgrade.mikrotik.com"; :set net true } on-error={ :delay 10s; :set w ($w + 10) }
    }
    :if (!$net) do={
      $say "STOPPED: no internet. Plug ether1 (WAN) into a network with DHCP and internet, then import the file again (drag it into Files again if a restart removed it)."
      /system scheduler remove [find where name=$me]
      :error "ember-first-steps: no internet"
    }

    # ----- RouterOS update: always the newest stable (never a fixed version; each start checks again) -----
    /system package update set channel=stable
    :local st ""
    :local tries 0
    :while ((!($st ~ "(New version is available|up to date)")) && ($tries < 3)) do={
      :set tries ($tries + 1)
      :do { /system package update check-for-updates once } on-error={}
      :local t 0
      :while (([/system package update get status] ~ "^(finding|checking)") && ($t < 60)) do={ :delay 1s; :set t ($t + 1) }
      :set st [/system package update get status]
      :if (!($st ~ "(New version is available|up to date)")) do={ :delay 20s }
    }
    :if ($st = "New version is available") do={
      $say ("RouterOS " . [/system package update get installed-version] . " -> " . [/system package update get latest-version] . ": downloading, the gateway restarts by itself")
      :do { /system package update install } on-error={
        $say "STOPPED: the RouterOS update could not start. Check the internet on ether1, then import the file again (drag it into Files again if a restart removed it)."
        /system scheduler remove [find where name=$me]
        :error "ember-first-steps: update install"
      }
      :delay 600s
      $say "STOPPED: the update did not restart the gateway within 10 min. Restart it (System > Reboot); it carries on by itself."
      :error "ember-first-steps: the update did not restart the gateway"
    }
    :if (!($st ~ "up to date")) do={
      $say ("STOPPED: the RouterOS update check failed (" . $st . "). Check the internet on ether1, then import the file again (drag it into Files again if a restart removed it).")
      /system scheduler remove [find where name=$me]
      :error "ember-first-steps: update check failed"
    }
    $say ("RouterOS " . [/system package update get installed-version] . " is up to date")

    # ----- iot package (the /iot commands only exist with it, hence :parse) -----
    :local iotOk true
    :do { :local p [:parse "/iot lora print count-only"] } on-error={ :set iotOk false }
    :if (!$iotOk) do={
      $say "installing the iot package, the gateway restarts by itself"
      :do {
        :local f1 [:parse "/system package enable iot"]
        $f1
        :local f2 [:parse "/system package apply-changes"]
        $f2
      } on-error={
        $say "STOPPED: the iot package could not be enabled. Install the iot package by hand (Manual Setup, step 1.4), then drag the file in again and import it."
        /system scheduler remove [find where name=$me]
        :error "ember-first-steps: iot package"
      }
      :delay 600s
      $say "STOPPED: the iot install did not restart the gateway within 10 min. Restart it (System > Reboot); it carries on by itself."
      :error "ember-first-steps: the iot install did not restart the gateway"
    }
    $say "iot package is installed"

    # ----- preconfigured LoRaWAN server entries -----
    # only while no LoRa card uses a server yet (as after a reset): a later import must not wipe a backend set in Step 3
    :local f4 [:parse ":local s \"\"; :foreach i in=[/iot lora find] do={ :set s (\$s . [:tostr [/iot lora get \$i servers]]) }; :return \$s"]
    :local used [$f4]
    :local lnsTxt "preconfigured LoRaWAN server entries removed"
    :if ($used = "") do={
      :local f3 [:parse "/iot lora servers remove [find]"]
      $f3
      $say "preconfigured LoRaWAN server entries removed"
    } else={
      $say ("server entries left as they are: the LoRa card already uses server(s) " . $used)
      :set lnsTxt ("LoRaWAN server entries left as they were (in use: " . $used . ")")
    }

    # ----- RouterBOARD firmware -----
    :local cur [/system routerboard get current-firmware]
    :local up [/system routerboard get upgrade-firmware]
    :if ($cur != $up) do={
      $say ("RouterBOARD firmware " . $cur . " -> " . $up . ", the gateway restarts by itself")
      :do { /system routerboard upgrade } on-error={
        $say "STOPPED: the RouterBOARD upgrade could not start. Upgrade the RouterBOARD by hand (Manual Setup, step 1.5)."
        /system scheduler remove [find where name=$me]
        :error "ember-first-steps: routerboard upgrade"
      }
      :delay 15s
      /system reboot
      :delay 120s
      $say "STOPPED: the gateway did not restart after the RouterBOARD upgrade. Restart it (System > Reboot); it carries on by itself."
      :error "ember-first-steps: the restart after the RouterBOARD upgrade did not happen"
    }

    # ----- setup protocol in Files: the admin password from the start and everything that is set now -----
    :local nl "\r\n"
    :local pf "ember-protocol.txt"
    :if ([:len [/file find where name="flash"]] > 0) do={ :set pf "flash/ember-protocol.txt" }
    :local pw ""
    :local pwOk false
    :local pwOld false
    :do {
      :local c [/file get [/file find where name=$pf] contents]
      :if ([:typeof [:find $c "not changed by the setup"]] = "num") do={ :set pwOld true }
      :local p [:find $c "Password: "]
      :if ((!$pwOld) && ([:typeof $p] = "num")) do={
        :local cand [:pick $c ($p + 10) ($p + 22)]
        :if (([:len $cand] = 12) && ([:typeof [:find $cand " "]] != "num")) do={ :set pw $cand; :set pwOk true }
      }
    } on-error={}
    :local mac ""
    :do { :set mac [/interface ethernet get [find where default-name="ether1"] mac-address] } on-error={}
    :local lmac ""
    :do { :set lmac [/interface bridge get [find where name="bridge0"] mac-address] } on-error={}
    :if ([:len $mac] = 0) do={ :set mac "(could not be read)" }
    :if ([:len $lmac] = 0) do={ :set lmac "(could not be read)" }
    :local wan "none yet"
    :do { :local a [/ip dhcp-client get [find where interface="ether1"] address]; :if ([:len $a] > 0) do={ :set wan $a } } on-error={}
    :local iotv ""
    :do { :set iotv [/system package get [find where name="iot"] version] } on-error={}
    # /iot (see the iot package above) and the LTE monitor only through :parse
    :local lora ""
    :do {
      :local f5 [:parse ":local o \"\"; :foreach i in=[/iot lora find] do={ :local r [/iot lora get \$i]; :set o (\$o . \"  \" . (\$r->\"name\") . \": gateway ID \" . (\$r->\"gateway-id\") . \", channel plan \" . (\$r->\"channel-plan\") . \", antenna \" . (\$r->\"antenna\") . \", antenna-gain \" . (\$r->\"antenna-gain\") . \" dBi\\r\\n\") }; :return \$o"]
      :set lora [$f5]
    } on-error={ :set lora ("  (could not be read)" . $nl) }
    :if ([:len $lora] = 0) do={ :set lora ("  no LoRa card found" . $nl) }
    :local lte ""
    # after a restart the LTE modem shows up a little later
    :local lw 0
    :while (([:len [/interface lte find]] = 0) && ($lw < 60)) do={ :delay 5s; :set lw ($lw + 5) }
    :do {
      :local f6 [:parse ":local o \"\"; :foreach i in=[/interface lte find] do={ :local m [/interface lte monitor \$i once as-value]; :set o (\$o . \"  \" . [/interface lte get \$i name] . \": \" . (\$m->\"model\") . \", firmware \" . (\$m->\"revision\") . \", IMEI \" . (\$m->\"imei\") . \"\\r\\n\") }; :return \$o"]
      :set lte [$f6]
    } on-error={ :set lte ("  (could not be read)" . $nl) }
    :if ([:len $lte] = 0) do={ :set lte ("  no LTE modem found" . $nl) }
    :local t ("HARDWARIO EMBER - setup protocol" . $nl . $nl . "Setup done " . [/system clock get date] . " " . [/system clock get time] . " (EMBER clock)" . $nl . $nl)
    :if ($pwOk) do={
      :set t ($t . "Login" . $nl . "  User: admin" . $nl . "  Password: " . $pw . $nl . $nl)
    }
    :if ($pwOld) do={
      :set t ($t . "Login" . $nl . "  User: admin" . $nl . "  Password: not changed by the setup, still your old password" . $nl . $nl)
    }
    :if ((!$pwOk) && (!$pwOld)) do={
      :set t ($t . "Login" . $nl . "  User: admin" . $nl . "  Password: not in this file; the one shown in the terminal at the start of the setup" . $nl . $nl)
    }
    :set t ($t . "Unit" . $nl . "  Model: " . [/system routerboard get model] . $nl . "  Serial number: " . [/system routerboard get serial-number] . $nl . "  MAC address WAN ether1 (Winbox from your network): " . $mac . $nl . "  MAC address LAN ether2/ether3 (Winbox by cable): " . $lmac . $nl . "  Identity: " . [/system identity get name] . $nl . $nl)
    :set t ($t . "Software" . $nl . "  RouterOS: " . [/system resource get version] . " (update channel " . [/system package update get channel] . ")" . $nl . "  RouterBOARD firmware: " . $cur . $nl . "  iot package: " . $iotv . $nl . $nl)
    :set t ($t . "Network" . $nl . "  WAN ether1: DHCP client, address " . $wan . $nl . "  LAN bridge0 (ether2, ether3): 172.31.255.1/24, no DHCP server: set a static IP in 172.31.255.0/24 on your PC" . $nl . $nl)
    :set t ($t . "LoRa" . $nl . $lora . $nl . "LTE" . $nl . $lte . $nl)
    :set t ($t . "Set by the setup" . $nl . "  - what was left of the MikroTik default configuration removed" . $nl . "  - identity ember, LAN bridge0 with ether2 and ether3, DHCP client on ether1, login note off" . $nl . "  - RouterOS updated to the newest stable, iot package installed, RouterBOARD firmware upgraded" . $nl . "  - " . $lnsTxt . $nl . "  - new random admin password (above)" . $nl . $nl)
    :set t ($t . "Next: Step 2 (check the setup) and Step 3 (LoRaWAN backend) on https://docs.hardwario.com/ember/automated-setup/" . $nl)
    :local saved false
    :do {
      :if ([:len [/file find where name=$pf]] = 0) do={
        :do { :local f [:parse ("/file add name=\"" . $pf . "\" type=file")]; $f } on-error={ /file print file=[:pick $pf 0 ([:len $pf] - 4)] }
        :local fw 0
        :while (([:len [/file find where name=$pf]] = 0) && ($fw < 10)) do={ :delay 1s; :set fw ($fw + 1) }
      }
      /file set [/file find where name=$pf] contents=$t
      :set saved true
    } on-error={}
    :if ($saved && $pwOk) do={
      $say ("DONE. RouterOS " . [/system resource get version] . ", RouterBOARD firmware " . $cur . ". The admin password and the setup protocol are in Files: " . $pf . ". Next: Step 2, check the setup.")
    }
    :if ($saved && $pwOld) do={
      $say ("DONE. RouterOS " . [/system resource get version] . ", RouterBOARD firmware " . $cur . ". The setup protocol is in Files: " . $pf . " (the admin password was not changed: still your old one). Next: Step 2, check the setup.")
    }
    :if ($saved && (!$pwOk) && (!$pwOld)) do={
      $say ("DONE. RouterOS " . [/system resource get version] . ", RouterBOARD firmware " . $cur . ". The setup protocol is in Files: " . $pf . " (the admin password is the one shown in the terminal at the start). Next: Step 2, check the setup.")
    }
    :if (!$saved) do={
      $say ("DONE. RouterOS " . [/system resource get version] . ", RouterBOARD firmware " . $cur . ". The setup protocol could not be completed; the admin password is the one shown at the start. Next: Step 2, check the setup.")
    }
    /system scheduler remove [find where name=$me]
    /system script remove [find where name=$me]
  }
  # after every restart until it is done
  /system scheduler add name=ember-first-steps start-time=startup on-event=":delay 20s; /system script run ember-first-steps" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon comment="ember-first-steps: carries on after a restart; removed when done"
  # in the background, so a dropped Winbox connection cannot stop it
  :execute "/system script run ember-first-steps"
  :put "ember-first-steps: started. The gateway restarts by itself (once or twice); Winbox disconnects then, reconnect by MAC (Neighbors) with the new admin password shown below. Done when the Log shows: ember-first-steps: DONE"
  :put ("ember-first-steps: NEW ADMIN PASSWORD: " . $pw)
  :put ("ember-first-steps: write it down now. The setup waits 2 minutes, then Winbox disconnects; from then on it logs in with this password. It is also in Files: " . $pf)
  :do { /user set [find where name="admin"] password=$pw } on-error={
    :put "ember-first-steps: the admin password could NOT be set. Log in with your old password. The setup runs anyway."
    :do {
      /file set [/file find where name=$pf] contents=("HARDWARIO EMBER - setup protocol" . $nl . $nl . "Login" . $nl . "  User: admin" . $nl . "  Password: not changed by the setup (log in with your old password)" . $nl)
    } on-error={ /file remove [/file find where name=$pf] }
  }
}
