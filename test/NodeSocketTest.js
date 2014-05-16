/*
 * (C) 2014 SoftwareCo-oP
 */

(function(Pipeline, NodeSocket) {

    var WebSocket = require('ws');

    describe('NodeSocketTest', function() {


        it('can start the server', function(done) {
            var WsPipeline = {
                type : 'WsPipeline',
                port : 3000,
                path : servePath,
                wsPath : '/node'
            }
            Pipeline.prepend(WsPipeline, Pipeline.uniqueMemoryDag())

            var WsNode = {
                url : 'ws://localhost:3000/node';
            }
            var pipe = Pipeline.append(COMPOSITE.dag, WsNode, Pipeline.uniqueMemoryDag());

            var testNode = {myval : '3'}
            pipe.bin.mux.add(testNode)

            //find WsPipeline dag
            //find WsNode dag
            //check if they contain testNode

        });

        it('nodes are rebroadcasted', function(done) {
            var testPort = 3002;
            var httpNode = {
                servePath : servePath,
                port : testPort,
                type : 'HttpNodePipeline'
            }
            var pipeline = Pipeline.prepend(httpNode, Pipeline.uniqueMemoryDag());
            httpNode.object.routeNodesToPipeline();
            var socket = socketioclient.connect('http://localhost:' + testPort);
            var socket2 = socketioclient.connect('http://localhost:' + testPort);
            socket.on('node', function(clientNode) {
                if (clientNode.id === 2) {
                    done();
                }
            });
            var nodeSocket = new NodeSocket(socket);
            var nodeSocket2 = new NodeSocket(socket2);
            var node = {id:1};
            var node2 = {id:2};
            socket.emit('node', node);
            socket2.emit('node', node2);

            //nodeSocket2.add(node);
            //nodeSocket2.add(node);
            //nodeSocket2.add(node2);
        })

        it("doesn't reflect the nodes back to the sender", function(done) {
            var testPort = 3003;
            var httpNodePipeline = new HttpNodePipeline(servePath, testPort);
            pipeline = httpNodePipeline.install();
            httpNodePipeline.routeNodesToPipeline();
            var socket1 = socketioclient.connect('http://localhost:' + testPort);
            var socket2 = socketioclient.connect('http://localhost:' + testPort);
            var socket3 = socketioclient.connect('http://localhost:' + testPort);

            //expected to receive nodes with the following nodes
            var nodes1 = [2, 3];
            var nodes2 = [1, 3];
            var nodes3 = [1, 2];

            socket1.on(function(message) {
                console.log(message);
            })

            socket1.on('node', function(n1) {
                if (nodes1.indexOf(n1.id) < 0) {
                    throw new Error("Oops I shouldn't get my own message");
                }
            })

            socket2.on('node', function(n2) {
                if (nodes2.indexOf(n2.id) < 0) {
                    throw new Error("Oops I shouldn't get my own message");
                }
            })

            socket3.on('node', function(n3) {
                if (nodes3.indexOf(n3.id) < 0) {
                    throw new Error("Oops I shouldn't get my own message");
                }
                if (n3.id === 3) {
                    done()
                }
            })



            var nodeSocket1 = new NodeSocket(socket1);
            var nodeSocket2 = new NodeSocket(socket2);
            var nodeSocket3 = new NodeSocket(socket3);
            var node1 = new Node({id:1});
            var node2 = new Node({id:2});
            var node3 = new Node({id:3});

            nodeSocket1.add(node1);
            nodeSocket2.add(node2);
            nodeSocket3.add(node3);

        })

    })
})(COMPOSITE.Pipeline, COMPOSITE.NodeSocket)
