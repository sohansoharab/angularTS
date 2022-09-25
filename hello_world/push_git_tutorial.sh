while true;
do
	modsec=$(date --utc --reference=tutorial.md +%s)
	nowsec=$(date +%s)
	delta=$((nowsec-modsec))

	see="Something"

	if [ $delta -lt 30 ]; then
		if [[ $see!="nothing to commit, working tree clean" ]]; then
			git add .
			git commit -m "hello"
			see=`git commit -m "hello" | grep "nothing to commit"`
			git push
		fi
	fi
	modsec=$(date --utc --reference=tutorial.md +%s)
	nowsec=$(date +%s)
	delta=$((nowsec-modsec))
done

