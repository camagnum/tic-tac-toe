const jogo = {
    
    board: ['','','','','','','','',''],
    symbols: {
        options: ['X','O'],
        turn_index: 0,
        change: function(){
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    container_element: null,
    gameover: false,
    winner_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init: function(container) {
        this.container_element = container;
    },

    start: function() {
        this.board.fill('');
        this.draw();
        this.gameover = false;
    },

    make_play: function(position) {
        if (this.gameover) return false;
        if (this.board[position] === '') {
            this.board[position] = this.symbols.options[this.symbols.turn_index];
            this.draw();
            let winner_sequences_index = this.check_sequences(this.symbols.options[this.symbols.turn_index])
            if (winner_sequences_index >= 0) {
                this.check_gameover();
                alert("O SÍMBOLO " + this.symbols.options[this.symbols.turn_index] + " GANHOU");
            } else {
                this.symbols.change();
            }
            return true;
        } else {
            return false;
        }
    },

    check_sequences: function(symbol) {
        for (i in this.winner_sequences) {
            if (this.board[this.winner_sequences[i][0]] == symbol &&
                this.board[this.winner_sequences[i][1]] == symbol &&
                this.board[this.winner_sequences[i][2]] == symbol) {
                    console.log('Sequência vencedora: ' + i);
                    return i;
                };
        };
        return -1;
    },

    check_gameover: function() {
        this.gameover = true;
        console.log('GAME OVER!')
    },

    draw: function() {
        let content = '';

        for (i in this.board) {
            content += '<div onclick="jogo.make_play(' + i + ')">' + this.board[i] + '</div>';

        }

        this.container_element.innerHTML = content;
    }
}