$(function () {
	var docUrlArr = document.URL.split('/');
	var job_id = docUrlArr[docUrlArr.length - 3];

	$('#active-filters').hide();

	$('#refine-data').click(function() {
		$('.filters').show();
		$('#active-filters').show();
	});

	$('#active-filters .list-inline').hide();

	var databaseFilters = [];
	
// Filter1 Start
	$('#add-another').bind('click', function() {

		$('#active-filters .list-inline.filter-group1').show();

		var filter11 = $('#filter11'),
			filter12 = $('#filter12'),
			filter13 = $('#filter13'),
			f11Sel = filter11.find(':selected'),
			f12Sel = filter12.find(':selected'),
			f13Sel = filter13.find(':selected');
		if (f11Sel.val()!='' && f12Sel.val()!='' && f13Sel.val()!='') {
			$('.added-filter1').show();
			$('.added-filter1 .list-inline').prepend('<li>'+f11Sel.text() +'&nbsp;'+ f12Sel.text() +'&nbsp;'+ f13Sel.text()+'<span class="badge"><i class="fa fa-close"></i></span></li>');

			var filter1Data = $('.added-filter1 .list-inline').html();
			$('#active-filters .list-inline.filter-group1').html(filter1Data);

			databaseFilters.unshift({'name': f11Sel.val(), 'type': f12Sel.val(), 'value': f13Sel.val()});

			filter11.val('');
			filter12.val('');
			filter13.val('');
			$('.selectpicker').selectpicker('refresh');

			// function removeFilter1() {
			//     $('.added-filter1 .list-inline span').bind('click', function() {
			//         $(this).parent('li').remove();
			//         var filter1Data = $('.added-filter1 .list-inline').html();
			//         $('#active-filters .list-inline.filter-group1').html(filter1Data);

			//         filter11.val('');
			//         filter12.val('');
			//         filter13.val('');
			//         $('.selectpicker').selectpicker('refresh');
			//         removeFilter2();
			//     });
			// }

			// function removeFilter2() {
			//     $('#active-filters .list-inline.filter-group1 span').bind('click', function() {
			//         $(this).parent('li').remove();
			//         var filter1Data = $('#active-filters .list-inline.filter-group1').html();
			//         $('.added-filter1 .list-inline').html(filter1Data);

			//         $('#filter11').val('');
			//         $('#filter12').val('');
			//         $('#filter13').val('');
			//         $('.selectpicker').selectpicker('refresh');
			//         removeFilter1();
			//     });
			// }

			// removeFilter1();
			// removeFilter2();


		} else {
			alert("Please select all the required fields");
		}
		// console.log(databaseFilters);
	});

	$('body').on('click', '#dbFilterPnl1 span', function (e) {
		// alert('dbFilterPnl1');
		var index = $(this).parent().index();
		databaseFilters.splice(index, 1);
		$(this).parent().remove();
		$('#dbFilterPnl2').html($('#dbFilterPnl1').html());
		// console.log(databaseFilters);
	});

	$('body').on('click', '#dbFilterPnl2 span', function (e) {
		// alert('dbFilterPnl2');
		var index = $(this).parent().index();
		databaseFilters.splice(index, 1);
		$(this).parent().remove();
		$('#dbFilterPnl1').html($('#dbFilterPnl2').html());
		// console.log(databaseFilters);
	});

// Filter1 End
	
	$('#clear-filters').bind('click', function() {
		$('#filter11, #filter12, #filter13, #chr-count, #chr-operator-start, #chr-start-count, #chr-operator-end, #chr-end-count, #gene').val('');
		$('#func input[type="checkbox"]').removeAttr('checked');
		$('#exonic-func input[type="checkbox"]').removeAttr('checked');
		
		$('.added-filter1 .list-inline li').html('');
		$('#active-filters .list-inline.filter-group1').html('').hide();
		$('#active-filters .list-inline.filter-group2 li').html('').hide();
		$('#active-filters .list-inline.filter-group2').hide();
		$('#active-filters .list-inline.filter-group3').html('').hide();
		$('#active-filters .list-inline.filter-group4').html('').hide();

		$('.selectpicker').selectpicker('refresh');

		$('.filters, #active-filters').hide();

	});

//Filter2 Start

	$('#active-filters .list-inline.filter-group2 li').hide();

	$('#chr-count').on('input', function() {

		if ($(this).val()!='') {
			$('#active-filters .list-inline.filter-group2').show();
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(1)').show();

			var chrCount = $(this).val();
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(1)').html('CHR: '+chrCount+'<span class="badge"><i class="fa fa-close"></i></span>');
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(1) span').bind('click', function() {
				$(this).parent().html('');
				$('#chr-count').val('');
				$('#active-filters .list-inline.filter-group2 li:nth-of-type(1)').hide();
			});
		} else {
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(1)').html('');
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(1)').hide();
		}

	});

	$('#chr-start-count').on('input', function() {

		if ($(this).val()!='') {
			$('#active-filters .list-inline.filter-group2').show();
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(2)').show();

			var startCount = $(this).val(),
			chrStartVal = $('#chr-operator-start').find(':selected').text();

			if ($('#chr-operator-start').val()!=''){
				$('#active-filters .list-inline.filter-group2 li:nth-of-type(2)').html('Start '+ chrStartVal +'&nbsp;'+ startCount+'<span class="badge"><i class="fa fa-close"></i></span>');
				$('#active-filters .list-inline.filter-group2 li:nth-of-type(2) span').bind('click', function() {
					$(this).parent().html('');
					$('#chr-start-count').val('');
					$('#chr-operator-start').val('');
					$('.selectpicker').selectpicker('refresh');
					$('#active-filters .list-inline.filter-group2 li:nth-of-type(2)').hide();
				});
			} else {
				alert("Please Select Operator")
			}
		} else {
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(2)').html('');
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(2)').hide();
		}
	});

	$('#chr-end-count').on('input', function() {

		if ($(this).val()!='') {
			$('#active-filters .list-inline.filter-group2').show();
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(3)').show();

			var endCount = $(this).val(),
			chrEndVal = $('#chr-operator-end').find(':selected').text();

			if ($('#chr-operator-end').val()!=''){
				$('#active-filters .list-inline.filter-group2 li:nth-of-type(3)').html('End '+ chrEndVal +'&nbsp;'+ endCount+'<span class="badge"><i class="fa fa-close"></i></span>');
				$('#active-filters .list-inline.filter-group2 li:nth-of-type(3) span').bind('click', function() {
					$(this).parent().html('');
					$('#chr-end-count').val('');
					$('#chr-operator-end').val('');
					$('.selectpicker').selectpicker('refresh');
					$('#active-filters .list-inline.filter-group2 li:nth-of-type(3)').hide();
				});
			} else {
				alert("Please Select Operator")
			}
		} else {
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(3)').html('');
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(3)').hide();
		}

	});

	$('#gene').on('input', function() {

		if ($(this).val()!='') {
			$('#active-filters .list-inline.filter-group2').show();
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(4)').show();

			var gene = $(this).val();
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(4)').html('Gene: '+gene+'<span class="badge"><i class="fa fa-close"></i></span>');
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(4) span').bind('click', function() {
				$(this).parent().html('');
				$('#gene').val('');
				$('#active-filters .list-inline.filter-group2 li:nth-of-type(4)').hide();
			});
		} else {
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(4)').html('');
			$('#active-filters .list-inline.filter-group2 li:nth-of-type(4)').hide();
		}

	});

//Filter2 End

// Filter3 Starts
	
	
	$('#func .checkbox input').bind('click', function() {
		var selectedCheckbox = $(this).val();
		if($(this).is(':checked')){
			$('#active-filters .list-inline.filter-group3').show();
			$('#active-filters .list-inline.filter-group3').append('<li data-select="'+selectedCheckbox+'">'+selectedCheckbox+'<span class="badge"><i class="fa fa-close"></i></span></li>');
		} else {
			$('#active-filters .list-inline.filter-group3 li[data-select="'+selectedCheckbox+'"]').remove();
		}
		$('#active-filters .list-inline.filter-group3 li span').bind('click', function() {
			var checkValue = $(this).parent('li').attr('data-select');
			$('#func .checkbox input[value="'+checkValue+'"]').removeAttr('checked');
			$(this).parent('li').remove();
		});
	});

	$('#exonic-func .checkbox input').bind('click', function() {
		var selectedCheckbox = $(this).val();
		if($(this).is(':checked')){
			$('#active-filters .list-inline.filter-group4').show();
			$('#active-filters .list-inline.filter-group4').append('<li data-select="'+selectedCheckbox+'">'+selectedCheckbox+'<span class="badge"><i class="fa fa-close"></i></span></li>');
		} else {
			$('#active-filters .list-inline.filter-group4 li[data-select="'+selectedCheckbox+'"]').remove();
		}
		$('#active-filters .list-inline.filter-group4 li span').bind('click', function() {
			var checkValue = $(this).parent('li').attr('data-select');
			$('#exonic-func .checkbox input[value="'+checkValue+'"]').removeAttr('checked');
			$(this).parent('li').remove();
		});
	});

// Filter3 End

	$('#filter-results').bind('click', function() {
		var q = generateQuery();
		if (q != '') {
			getGeneDiffResults(q);
		} else {
			alert('Please select any fields to apply filter');
		}
	});

	// $(".select").dropdown({ "autoinit" : ".select" });
	$('.selectpicker').selectpicker();

	$('.table-responsive').doubleScroll();

	function generateQuery() {
		var qDatabase = qFunc = qExonicFunc = qCHR = qStart = qEnd = qGene = '';
		$('input[name="chk-func"]:checked').each(function () {
			qFunc += 'Func.refGene:"' + $(this).val() + '" OR '
		});
		qFunc = qFunc.slice(0, -4);

		$('input[name="chk-exonic-func"]:checked').each(function () {
			qExonicFunc += 'ExonicFunc.refGene:"' + $(this).val() + '" OR '
		});
		qExonicFunc = qExonicFunc.slice(0, -4);

		var chrVal = $('#chr-count').val().trim();
		if (chrVal != '') {
			qCHR = 'Chr:' + chrVal;
		}

		var geneVal = $('#gene').val().trim();
		if (geneVal != '') {
			qGene = 'Gene.refGene:' + geneVal;
		}

		var startType = $('#chr-operator-start').val();
		var startVal = $('#chr-start-count').val().trim();
		if (startVal != '') {
			switch (startType) {
				case '>=':
					qStart = 'Start:['+ startVal +' TO *]';
					break;
				case '<=':
					qStart = 'Start:[* TO '+ startVal +']';
					break;
				case '=':
					qStart = 'Start:'+ startVal;
					break;
			}
		}

		var endType = $('#chr-operator-end').val();
		var endVal = $('#chr-end-count').val().trim();
		if (endVal != '') {
			switch (endType) {
				case '>=':
					qEnd = 'End:['+ endVal +' TO *]';
					break;
				case '<=':
					qEnd = 'End:[* TO '+ endVal +']';
					break;
				case '=':
					qEnd = 'End:'+ endVal;
					break;
			}
		}

		for (var i = 0; i < databaseFilters.length; i++) {
			switch (databaseFilters[i].type) {
				case '>=':
					qDatabase += databaseFilters[i].name + ':[' + databaseFilters[i].value + ' TO *] OR ';
					break;
				case '<=':
					qDatabase += databaseFilters[i].name + ':[* TO ' + databaseFilters[i].value + '] OR ';
					break;
				case '=':
					qDatabase += databaseFilters[i].name + ':' + databaseFilters[i].value + ' OR ';
					break;
			}
		}
		qDatabase = qDatabase.slice(0, -4);

		var q = '';
		if (qDatabase != '') {
			q += '(' + qDatabase + ') AND ';
		}
		if (qCHR != '') {
			q += '(' + qCHR + ') AND ';
		}
		if (qStart != '') {
			q += '(' + qStart + ') AND ';
		}
		if (qEnd != '') {
			q += '(' + qEnd + ') AND ';
		}
		if (qGene != '') {
			q += '(' + qGene + ') AND ';
		}
		if (qFunc != '') {
			q += '(' + qFunc + ') AND ';
		}
		if (qExonicFunc != '') {
			q += '(' + qExonicFunc + ') AND ';
		}
		q = q.slice(0, -5);
		// var x = {'qDatabase': qDatabase,'qFunc': qFunc, 'qExonicFunc': qExonicFunc, 'qCHR': qCHR, 'qStart': qStart, 'qEnd': qEnd, 'qGene': qGene};
		// console.log(x);
		console.log(q);
		return q;
	}

	function getGeneDiffResults(q) {
		var data = '';
		if (q) {
			data = {start: 0, q: q};
		}
		$.ajax({
			method: 'POST',
			url: '/api/job/' + job_id + '/filter/',
			dataType: 'json',
			data: data,
			beforeSend: function(xhr, settings) {
				$('body').addClass('preload');
				xhr.setRequestHeader("X-CSRFToken", csrftoken);
			}
		})
		.done( function (d, textStatus, jqXHR) {
			console.log(d);
			if (d.length > 0) {
				kvm.GeneDifferences([]);
				for(var i = 0; i < d.length; i++) {
					kvm.GeneDifferences.push(new GeneDiff(d[i]));
				}
				$('.filters').hide();
			} else {
				alert('No Results found for your filter, modify your filter');
			}
		})
		.fail( function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
		})
		.always(function() {
			$('body').removeClass('preload'); // console.log("complete");
		});
	}

	function GeneDiff(x) {
		var self = this;

		self['Chr'] = x['Chr'][0] || '';
		self['Start'] = x['Start'][0] || '';
		self['End'] = x['End'][0] || '';
		self['Ref'] = x['Ref'][0] || '';
		self['Alt'] = x['Alt'][0] || '';
		
		if (x['Func.refGene'] != undefined) {
			self['Func.refGene'] = x['Func.refGene'][0] || '';
		} else {
			self['Func.refGene'] = '';
		}

		if (x['Gene.refGene'] != undefined) {
			self['Gene.refGene'] = x['Gene.refGene'][0] || '';
		} else {
			self['Gene.refGene'] = '';
		}

		if (x['GeneDetail.refGene'] != undefined) {
			self['GeneDetail.refGene'] = x['GeneDetail.refGene'][0] || '';
		} else {
			self['GeneDetail.refGene'] = '';
		}

		if (x['ExonicFunc.refGene'] != undefined) {
			self['ExonicFunc.refGene'] = x['ExonicFunc.refGene'][0] || '';
		} else {
			self['ExonicFunc.refGene'] = '';
		}

		if (x['AAChange.refGene'] != undefined) {
			self['AAChange.refGene'] = x['AAChange.refGene'][0] || '';
		} else {
			self['AAChange.refGene'] = '';
		}

		if (x['cytoBand'] != undefined) {
			self['cytoBand'] = x['cytoBand'][0] || '';
		} else {
			self['cytoBand'] = '';
		}

		if (x['genomicSuperDups'] != undefined) {
			self['genomicSuperDups'] = x['genomicSuperDups'][0] || '';
		} else {
			self['genomicSuperDups'] = '';
		}

		if (x['esp6500siv2_all'] != undefined) {
			self['esp6500siv2_all'] = x['esp6500siv2_all'][0] || '';
		} else {
			self['esp6500siv2_all'] = '';
		}

		if (x['1000g2014oct_all'] != undefined) {
			self['1000g2014oct_all'] = x['1000g2014oct_all'][0] || '';
		} else {
			self['1000g2014oct_all'] = '';
		}

		if (x['1000g2014oct_afr'] != undefined) {
			self['1000g2014oct_afr'] = x['1000g2014oct_afr'][0] || '';
		} else {
			self['1000g2014oct_afr'] = '';
		}

		if (x['1000g2014oct_eas'] != undefined) {
			self['1000g2014oct_eas'] = x['1000g2014oct_eas'][0] || '';
		} else {
			self['1000g2014oct_eas'] = '';
		}

		if (x['1000g2014oct_eur'] != undefined) {
			self['1000g2014oct_eur'] = x['1000g2014oct_eur'][0] || '';
		} else {
			self['1000g2014oct_eur'] = '';
		}

		if (x['snp138'] != undefined) {
			self['snp138'] = x['snp138'][0] || '';
		} else {
			self['snp138'] = '';
		}


		if (x['SIFT_score'] != undefined) {
			self['SIFT_score'] = x['SIFT_score'][0] || '';
		} else {
			self['SIFT_score'] = '';
		}

		if (x['SIFT_pred'] != undefined) {
			self['SIFT_pred'] = x['SIFT_pred'][0] || '';
		} else {
			self['SIFT_pred'] = '';
		}

		if (x['Polyphen2_HDIV_score'] != undefined) {
			self['Polyphen2_HDIV_score'] = x['Polyphen2_HDIV_score'][0] || '';
		} else {
			self['Polyphen2_HDIV_score'] = '';
		}

		if (x['Polyphen2_HDIV_pred'] != undefined) {
			self['Polyphen2_HDIV_pred'] = x['Polyphen2_HDIV_pred'][0] || '';
		} else {
			self['Polyphen2_HDIV_pred'] = '';
		}

		if (x['Polyphen2_HVAR_score'] != undefined) {
			self['Polyphen2_HVAR_score'] = x['Polyphen2_HVAR_score'][0] || '';
		} else {
			self['Polyphen2_HVAR_score'] = '';
		}

		if (x['Polyphen2_HVAR_pred'] != undefined) {
			self['Polyphen2_HVAR_pred'] = x['Polyphen2_HVAR_pred'][0] || '';
		} else {
			self['Polyphen2_HVAR_pred'] = '';
		}

		if (x['LRT_score'] != undefined) {
			self['LRT_score'] = x['LRT_score'][0] || '';
		} else {
			self['LRT_score'] = '';
		}

		if (x['LRT_pred'] != undefined) {
			self['LRT_pred'] = x['LRT_pred'][0] || '';
		} else {
			self['LRT_pred'] = '';
		}

		if (x['MutationTaster_score'] != undefined) {
			self['MutationTaster_score'] = x['MutationTaster_score'][0] || '';
		} else {
			self['MutationTaster_score'] = '';
		}

		if (x['MutationTaster_pred'] != undefined) {
			self['MutationTaster_pred'] = x['MutationTaster_pred'][0] || '';
		} else {
			self['MutationTaster_pred'] = '';
		}

		if (x['MutationAssessor_score'] != undefined) {
			self['MutationAssessor_score'] = x['MutationAssessor_score'][0] || '';
		} else {
			self['MutationAssessor_score'] = '';
		}

		if (x['MutationAssessor_pred'] != undefined) {
			self['MutationAssessor_pred'] = x['MutationAssessor_pred'][0] || '';
		} else {
			self['MutationAssessor_pred'] = '';
		}

		if (x['FATHMM_score'] != undefined) {
			self['FATHMM_score'] = x['FATHMM_score'][0] || '';
		} else {
			self['FATHMM_score'] = '';
		}

		if (x['FATHMM_pred'] != undefined) {
			self['FATHMM_pred'] = x['FATHMM_pred'][0] || '';
		} else {
			self['FATHMM_pred'] = '';
		}

		if (x['RadialSVM_score'] != undefined) {
			self['RadialSVM_score'] = x['RadialSVM_score'][0] || '';
		} else {
			self['RadialSVM_score'] = '';
		}

		if (x['RadialSVM_pred'] != undefined) {
			self['RadialSVM_pred'] = x['RadialSVM_pred'][0] || '';
		} else {
			self['RadialSVM_pred'] = '';
		}

		if (x['LR_score'] != undefined) {
			self['LR_score'] = x['LR_score'][0] || '';
		} else {
			self['LR_score'] = '';
		}

		if (x['LR_pred'] != undefined) {
			self['LR_pred'] = x['LR_pred'][0] || '';
		} else {
			self['LR_pred'] = '';
		}

		if (x['VEST3_score'] != undefined) {
			self['VEST3_score'] = x['VEST3_score'][0] || '';
		} else {
			self['VEST3_score'] = '';
		}

		if (x['CADD_raw'] != undefined) {
			self['CADD_raw'] = x['CADD_raw'][0] || '';
		} else {
			self['CADD_raw'] = '';
		}

		if (x['CADD_phred'] != undefined) {
			self['CADD_phred'] = x['CADD_phred'][0] || '';
		} else {
			self['CADD_phred'] = '';
		}

		if (x['GERP++_RS'] != undefined) {
			self['GERP_RS'] = x['GERP++_RS'][0] || '';
		} else {
			self['GERP_RS'] = '';
		}

		if (x['phyloP46way_placental'] != undefined) {
			self['phyloP46way_placental'] = x['phyloP46way_placental'][0] || '';
		} else {
			self['phyloP46way_placental'] = '';
		}

		if (x['phyloP100way_vertebrate'] != undefined) {
			self['phyloP100way_vertebrate'] = x['phyloP100way_vertebrate'][0] || '';
		} else {
			self['phyloP100way_vertebrate'] = '';
		}

		if (x['SiPhy_29way_logOdds'] != undefined) {
			self['SiPhy_29way_logOdds'] = x['SiPhy_29way_logOdds'][0] || '';
		} else {
			self['SiPhy_29way_logOdds'] = '';
		}
	}

	var kvm = {
		GeneDifferences: ko.observableArray([])
	};

	getGeneDiffResults();

	ko.applyBindings(kvm, document.getElementById('pnlGeneDifferences'));
});