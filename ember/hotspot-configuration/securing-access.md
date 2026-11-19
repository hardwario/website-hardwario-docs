---
title: Securing Access
title_meta: "Securing Access (EMBER)"
description: "EMBER Hotspot configuration: interface lists, firewall rules and services that secure access to RouterOS."
---

# Securing Access

The **EMBER Hotspot** is secured by a firewall and additional configuration options based on [**this MikroTik article**](https://help.mikrotik.com/docs/display/ROS/Securing+your+router).

## Interface Lists

```
/interface list add name=wan
/interface list add name=lan
/interface list add name=management
/interface list member add interface=ether1 list=wan
/interface list member add interface=lte1 list=wan
/interface list member add interface=bridge1 list=lan
/interface list member add interface=bridge1 list=management
/interface list member add interface=ember-cloud-ovpn list=management
/interface list member add interface=wireguard1 list=management
```

## Firewall

```
/ip firewall filter add action=fasttrack-connection chain=forward connection-state=established,related comment=FastTrack
/ip firewall filter add chain=forward action=drop connection-state=invalid comment="Drop invalid"
/ip firewall filter add chain=forward action=accept connection-state=established,related comment="Established, Related"
/ip firewall filter add chain=input action=accept connection-state=established,related comment="Established, Related"
/ip firewall filter add chain=input action=accept in-interface-list=management comment=Management
/ip firewall filter add action=drop chain=input
/ip firewall filter add action=accept chain=forward connection-state=new in-interface=bridge1 out-interface=ether1 comment="Internet for PC only from ether1"
/ip firewall filter add chain=forward action=drop
/ip firewall nat add action=masquerade chain=srcnat out-interface-list=wan
```

## Services

```
/ip neighbor discovery-settings set discover-interface-list=lan
/ipv6 settings set disable-ipv6=yes max-neighbor-entries=1024
/tool mac-server set allowed-interface-list=none
/tool mac-server mac-winbox set allowed-interface-list=none
/tool mac-server ping set enabled=no
/ipv6 nd set [find] disabled=yes
/tool bandwidth-server set enabled=no
/ip proxy set enabled=no
/ip socks set enabled=no
/ip upnp set enabled=no
/ip cloud set ddns-enabled=no update-time=yes
/ip ssh set strong-crypto=yes
/ip service set telnet disabled=yes
/ip service set ftp disabled=yes
/ip service set api disabled=yes
/ip service set api-ssl address=172.31.255.0/24,10.43.0.0/16,192.168.17.1
/ip service set ssh address=172.31.255.0/24,10.43.0.0/16,192.168.17.1
/ip service set winbox address=172.31.255.0/24,10.43.0.0/16,192.168.17.1
```
