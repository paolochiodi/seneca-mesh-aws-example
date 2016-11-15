![Seneca][Logo]

# seneca-mesh-aws-example
[![Gitter chat][gitter-badge]][gitter-url]

- __Sponsor:__ [nearForm][Sponsor]
- __Node:__ 6.x
- __Seneca:__ 3.3


This is an example setup of seneca with seneca-mesh on aws.

There are three different services:

- seneca-base: only contains the base node for the mesh
- seneca-implementation: provides the implementation for the `cmd:test,action:hello` message and returns `{answer:'hello!'}`
- seneca-act: provides an http server, the base `/` route will trigger the `cmd:test,action:hello` message and print the result

## How it works

seneca-base serves the sole purpose of being the knwon node of the swim network so that any additional node needs to know only this one in order to connect.
seneca-implementation instances connect to the network initiated by seneca-base and advertise themself as the implementor of `cmd:test` messages
seneca-act instances connects to the network too and receive from one of the other nodes the description of the network with the knoledge that the seneca-implementation instances implement `cmd:test`.

Both seneca-implementation and seneca-act are able to connect to seneca-base by obtaining it's ip address through aws sdk.

When an http request is received the message `cmd:test,action:hello` is sent by one of the seneca-act instances and it is routed to one of the seneca-implementation instances the responds with the requested content.

## Setup

The minimum deployment requires that at least one of each services.
I suggest to deploy them in three different ec2 instances in order to see the aws specific code in action.

### Launch 3 ec2 instances

In the suggested architecture you'll need to launch 3 ec2 instances, each one designed to host one of the three services.

Requirements:
- create a iam role and assign it to the instances so that api requests fired from the instances to aws will be authorized without the need to use api keys
- create a security policy so that all traffic between the 3 instances is allowed and tcp port 3000 can be reached from the internet (the best way is to use the same security policy for all the instances and allow all traffic from the security policy itself plus tcp port 3000 from anywhere)
- add a tag `mesh=base` on the instance that will host seneca-base

### Install node

```sh
wget -qO- https://deb.nodesource.com/setup_6.x | sudo bash -
sudo apt-get install nodejs
```

or use you preferred way

### Deploy

```sh
git clone https://github.com/paolochiodi/seneca-mesh-aws-example.git
cd seneca-mesh-aws-example
```

then `cd seneca-base` (or the other specific service you want to use on this instance) or use your preferred deployment method

### Launch the services

`node base.js`
`node implementation.js`
`node action.js`

The exact order here is not important as long as a base node is booted first

### Test

curl seneca-act-instance-address:3000 and you should get back `{"answer":"world!"}`

### Where to go from here

You can experiment with more complex deployment, in example launching multiple versions of seneca-implementation or seneca-act or different ec2 instances, or even multiple processes on the same instance. Those will join the network as long as a base node is still connected to the original network.


## Contributing
The [Senecajs org][] encourage open participation. If you feel you can help in any way,
be it with documentation, examples, extra testing, or new features please get in touch.


## License
Copyright (c) 2013 - 2016, Richard Rodger and other contributors.
Licensed under [MIT][].

[Sponsor]: http://nearform.com
[Logo]: http://senecajs.org/files/assets/seneca-logo.png
[gitter-badge]: https://badges.gitter.im/senecajs/seneca.png
[gitter-url]: https://gitter.im/senecajs/seneca
[MIT]: ./LICENSE
[Senecajs org]: https://github.com/senecajs/
[Seneca.js]: https://www.npmjs.com/package/seneca
[senecajs.org]: http://senecajs.org/
[github issue]: https://github.com/senecajs-labs/seneca-zipkin-tracer/issues
[@senecajs]: http://twitter.com/senecajs