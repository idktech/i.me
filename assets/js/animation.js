(function(){
"use strict";
    var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50,
        camera, scene, renderer,
        particles, particle, count = 0,
        mouseX = 0, mouseY = 0,
        windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2;
           
        init();
        animate();

        function init() {

            var container = document.getElementById( 'background-effect' );

            camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 300, 10000 );
            camera.position.z = 1000;

            scene = new THREE.Scene();

            particles = new Array();

            var PI2 = Math.PI * 2;
            var material = new THREE.SpriteCanvasMaterial( {

                color: 0x000000,
                program: function ( context ) {

                    context.beginPath();
                    context.arc( 0, 0, 0.3, 0, PI2, false );
                    context.fill();

                }

            } );

            var i = 0;

            for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

                for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

                    particle = particles[ i ++ ] = new THREE.Sprite( material );
                    particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                    particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                    scene.add( particle );

                }

            }

            renderer = new THREE.CanvasRenderer();
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( renderer.domElement );


            document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            //

            window.addEventListener( 'resize', onWindowResize, false );

        }

        function onWindowResize() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function onDocumentMouseMove( event ) {

            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;

        }

        function animate() {

            requestAnimationFrame( animate );
            render();

        }

        function render() {

            camera.position.x += ( mouseX - camera.position.x ) * .05;
            camera.position.y += ( - mouseY - camera.position.y ) * .05;
            camera.lookAt( scene.position );

            var i = 0;

            for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

                for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

                    particle = particles[ i++ ];
                    particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                        ( Math.sin( ( iy + count ) * 0.5 ) * 30 );
                    particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 +
                        ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;

                }

            }

            renderer.render( scene, camera );

            count += 0.1;

        }

})();
