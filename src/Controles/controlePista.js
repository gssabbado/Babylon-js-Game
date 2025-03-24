export function iniciarMovimentoPistas(scene, pistaModelo) {
    const numPistas = 7;
    const pistaSpeed = 0.3;
    const espacamento = 15;
    const limitPosition = -45;
    const resetPosition = 65;

    const pistas = [];

    // Criando as pistas clonadas
    for (let i = 0; i < numPistas; i++) {
        let pista = pistaModelo.clone(`pista${i}`, null, true);
        pista.position.set(i * espacamento - resetPosition / 2, 0.01, 0);
        pistas.push(pista);
    }

    scene.registerBeforeRender(() => {
        pistas.forEach(pista => {
            pista.position.x -= pistaSpeed;

            if (pista.position.x < limitPosition) {
                pista.position.x = resetPosition;
            }
        });
    });
}
