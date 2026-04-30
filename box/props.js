const pass = ((s, p) => {
    try {
        return p === "pandoraisland" ? 
            [...Array((1 << 3) | (1 << 2) | 1)].reduce(d => atob(d), s.replace(/[a-zA-Z]/g, c => 
                String.fromCharCode(c.charCodeAt(0) + (c.toUpperCase() <= 'M' ? p.length : -p.length))
            ) + "=".repeat((4 - s.length) & 3)) : undefined;
    } catch (e) {
        return null;
    }
})("Iz0jq2DlHKyIJTkJI0q4JSyHFz9JZIy3Jxp5I2WUrQOnIILjIwNkI2WRGyuuZHcHIzcOrSLlFxIHoTubGIuPHIMgZGEGZx15ITgJHzWTJyuMoSI3MHMnpISgEyEAoRcWIz10p2SJFaEuEmyIIwABZ1cIJzSxE05TH214H2WJFxcJoGRjLGSxFSAeMTcFITkuJJkbH1ETJaAKoHMdIzgnZSIgrSAHoHcTL0IjI2WHEKqJnxMKMRMBp1qfnTyFZzuMI1MxZSyJHxqJJTuLLyInpIMgpmSyEycLMHuxI01RExMIoSWUIwWSrIILMScJEKOVJKcTG2EJJaAGoJufLyubJILkMQEvZxy3GHubnyWgHyyMoTuGI0MFI1qgEzkJoSL1ISMFH1MeZKWwEzuJGJ5FZ1MdFxgJIxcMJxMjoTRmDxyKJUOUIQWFI1qhGyEvI3uHISpko1qfJKunESWcGJgfZ1EInT9KE0cVIJkfJzWUnSEJZScGIwSjE1EeAIAvEz93I2kJLIDlExqKox5dH0q4JSEJMT9AZIckHzgjoTWIJxyMIIceLHqSrTAToSuuZIcbIxEXG2ZlGxMuE3OGLxIjIIMgrT9EZJEmI25XJTWUHzSJoGR0I0MnJTEUqSqAn3O5ITknp1qgFxuuEyWKGHMjISMdEaqFIxMlG1qfH00lnSyJoKOYGxMErSqfnSEuZyWjIJgnF1LkHyuBIx5BGIMjrSHlqQOJExcmI25bI1VmnUMJnxcYH1MTp2WTnTuAIaOiIzgFF1DlGKyHn1cuHwWbISEKAJ9JIzEKIJf5Hx1eoQEJZJuiJIMXEyAgEyqvJTtmISInLILlExuCIzEcIyuPFIqHDzSwZJE0H2gxJTWKnSuMIRM3IxMnpIWhMSAAIxc5ITknG2SKEKqwEJkKLyuPGSEeJyWyEzEmLHMFnIWhDauJI3ueIGSfI1IfJyuvIIcmJJgnq2ITIKyxERWKGIMjrILlrUqKoScKL0uXJyMKHxqnIJECHwWXE2STnSEFIKOXIwSnH1ZkHKyHJTuuH0MnIyyeJxgwEyMkHzg0I1MfpRuJI3EYLGNkEIWfGyMFoRLmIHMSBIOECG0",atob("cGFuZG9yYWlzbGFuZA=="));