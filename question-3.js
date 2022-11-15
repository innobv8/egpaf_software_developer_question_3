function binaryDivisibleBy(x) {
    if(x==1) return '^(0|1)+$'
    expression = 0;
    while(x%2==0) { x/=2; expression+=1 }
    m = []; for(var i=0; i<x; i++) { m[i] = []; for(var j=0; j<x; j++) m[i][j] = ''; }
    for(var i=0; i<x; i++) {
        m[i][i*2%x] = '0'
        m[i][(i*2+1)%x] = '1'
    }
    for(var i=0; i<x; i++) {
        m[i][x-1] = ''
        m[x-1][i] = ''
    }
    if(x%2==1) m[(x-1)/2][x-2] = '01*0'
    else       m[  x/2-1][x-2] = '11*0'

    first = []; second = [];
    for(var k=1; k<x-1; k++) {
        for(var i=0; i<x; i++) { first[i] = ''; second[i] = '' }
        for(var i=0; i<x; i++) {
            if(m[i][k] != '') { first[i] = m[i][k]; m[i][k] = '';}
            if(m[k][i] != '') { second[i] = m[k][i]; m[k][i] = '';}
        }
        for(var i=0; i<x; i++) {
            if(first[i] != '') {
                for(var j=0; j<x; j++) {
                    if(second[j] != '') {
                        if(first[k] == '') {
                            if(m[i][j] == '') {
                                m[i][j] = '(' + first[i] + ')(' + second[j] + ')';
                            }
                            else {
                                m[i][j] = '(' + m[i][j] + ')|(' + first[i] + ')(' + second[j] + ')'
                            }

                        }
                        else if(i!=k){
                            if(m[i][j] == '') {
                                m[i][j] = '(' + first[i] + ')(' + first[k] + ')*(' + second[j] + ')'
                            }
                            else {
                                m[i][j] = '(' + m[i][j] + ')|(' + '(' + first[i] + ')(' + first[k] + ')*(' + second[j] + '))'
                            }
                        };
                    }
                }
            }
        }
    }
    if(expression==0) return '^('+m[0][0]+')+$'
    else if(x==1) return '^' + '(0|1)*' + Array(expression+1).join('0') + '$'
    else return '^' + '(' + m[0][0] + ')*' + Array(expression+1).join('0') + '$'
}
