# Passing JSON Parameters via Events in Flow Designer

## Lesson learned

Event parameters (`parm1`, `parm2` on `sys_flow_context` / `sysevent`) are
plain string fields. If a flow action needs to pass a structured object
(e.g. several values needed later to build an email body), you **cannot**
pass the object directly — it must be serialized to a string with
`JSON.stringify()` when the event fires, and then deserialized with
`JSON.parse()` wherever it's consumed (e.g. in the notification/email
script).

## Firing the event

Use a script (JSON data type) to build the payload and stringify it before
passing it as `parm2`:

```js
var x = {json1: 1, json2: 2};
return JSON.stringify(x);
```

This produces a `sys_flow_context` record where `Parm2` is stored as the
string `{"json1":1,"json2":2}` (not an object):

![sys_flow_context record showing Parm1 and the stringified Parm2](assets/sys_flow_context-record.png)

![JSON script used to build and stringify the payload](assets/json-stringify-script.png)

## Consuming the parameter (e.g. in an email body script)

On the receiving end (notification/email script, subscriber, etc.), parse
the string back into an object before using its fields:

```js
var data = JSON.parse(event.parm2);
gs.print(data.json1); // 1
gs.print(data.json2); // 2
```

## Takeaway

- Always `JSON.stringify()` before setting an event parm with structured
  data.
- Always `JSON.parse()` on the consuming side before accessing the
  object's properties — the raw `parm2` value is just a string.
